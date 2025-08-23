
import { GoogleGenAI, Type } from "@google/genai";
import type { ReviewSuggestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reviewSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      lineNumber: {
        type: Type.STRING,
        description: "The line number or range of lines (e.g., '10-15') where the issue is found. Be precise.",
      },
      title: {
        type: Type.STRING,
        description: "A short, descriptive title for the suggestion, like a linting rule name (e.g., 'Unused Variable').",
      },
      suggestion: {
        type: Type.STRING,
        description: "A detailed but concise explanation of the issue and the suggested improvement. Explain *why* it's a problem and how the fix helps.",
      },
    },
    required: ["lineNumber", "title", "suggestion"],
  },
};


export const reviewCode = async (code: string, language: string): Promise<ReviewSuggestion[]> => {
  const systemInstruction = `You are an expert code reviewer acting as an automated linting and analysis tool. Your task is to analyze the user-provided code and identify areas for improvement.

  Guidelines:
  - Provide clear, concise, and actionable feedback.
  - Focus on best practices, potential bugs, performance issues, security vulnerabilities, and code readability.
  - Do not comment on correct code. Only provide feedback on parts that can be improved.
  - If the code is perfect and has no issues, return an empty array.
  - Format your response strictly as a JSON array according to the provided schema.`;

  const prompt = `Please review the following ${language} code:\n\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: reviewSchema,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      // If Gemini returns nothing, it might mean the code is perfect.
      return [];
    }
    
    // The response is already a JSON string because of responseSchema
    const parsedResponse = JSON.parse(responseText);

    // Basic validation to ensure we got an array
    if (!Array.isArray(parsedResponse)) {
      console.error("Gemini response was not an array:", parsedResponse);
      throw new Error("Received an invalid response format from the AI.");
    }
    
    return parsedResponse as ReviewSuggestion[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from AI. The model may have had trouble processing the request. Please check your code or try again later.");
  }
};
