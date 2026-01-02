
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK strictly using the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (userInput: string, productsSummary: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for style advice: "${userInput}". Here is our current collection: ${productsSummary}. Provide 2-3 specific recommendations from the catalog or general ethnic styling tips. Be professional, friendly, and helpful like a high-end boutique personal shopper.`,
      config: {
        systemInstruction: "You are an expert Indian Ethnic Fashion Stylist for EthnicElite. You help women find the perfect Kurti for their body type, occasion, and preferences.",
        temperature: 0.7,
      },
    });

    // Accessing the .text property directly as per the latest SDK requirements.
    return response.text;
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return "I'm having a bit of a fashion block! But I'd recommend our Royal Blue Anarkali for a royal festive look or our White Chikankari for timeless elegance.";
  }
};