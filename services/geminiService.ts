
import { GoogleGenAI } from "@google/genai";

// We initialize the client in a way that respects the environment but doesn't crash if process.env is missing
const getAIClient = () => {
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : "";
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export const getStyleAdvice = async (userInput: string, productsSummary: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for style advice: "${userInput}". Here is our current collection: ${productsSummary}. Provide 2-3 specific recommendations from the catalog or general ethnic styling tips. Be professional, friendly, and helpful like a high-end boutique personal shopper.`,
      config: {
        systemInstruction: "You are an expert Indian Ethnic Fashion Stylist for EthnicElite. You help women find the perfect Kurti for their body type, occasion, and preferences.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return "I'm having a bit of a fashion block! But I'd recommend our Royal Blue Anarkali for a royal festive look or our White Chikankari for timeless elegance.";
  }
};
