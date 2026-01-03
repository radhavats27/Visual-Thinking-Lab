
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Always use process.env.API_KEY directly for initializing GoogleGenAI
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Safely iterate through response parts to find image data as per guidelines
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error('No image generated');
  }

  async calculateMatchPercentage(userPrompt: string, masterPrompt: string): Promise<number> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare the user's prompt with the master prompt and give a similarity score as a percentage (0-100).
      The score should reflect how many key visual elements, styles, and details are shared.
      
      Master Prompt: "${masterPrompt}"
      User Prompt: "${userPrompt}"
      
      Return ONLY the number as a JSON object with a field "score".`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER }
          },
          required: ['score']
        }
      }
    });

    // Directly access the .text property from the response
    const result = JSON.parse(response.text || '{"score": 0}');
    return Math.min(100, Math.max(0, result.score));
  }
}

export const geminiService = new GeminiService();
