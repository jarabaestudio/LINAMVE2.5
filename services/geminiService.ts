import { GoogleGenAI } from "@google/genai";

// This service is prepared for the "Smart Coach" feature mentioned in documentation.
// Following strict guidelines: API key from process.env.API_KEY

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid runtime errors during pure frontend demo
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateCombatFeedback = async (combatLog: string): Promise<string> => {
  if (!ai) return "AI Service not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza este registro de combate y dame 3 consejos tácticos breves: ${combatLog}`,
    });
    return response.text || "No se pudo generar el análisis.";
  } catch (error) {
    console.error("Error generating feedback:", error);
    return "Error en el servicio de IA.";
  }
};