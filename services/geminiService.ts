import { GoogleGenAI, Type } from "@google/genai";
import { SERVICE_MENU } from "../constants";
import { UserProfile, AnalysisResult } from "../types";

export const analyzeSkinCondition = async (
  profile: UserProfile,
  imageBase64: string
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Filter menu based on selected area (Face vs Body) to help AI
  const relevantServices = SERVICE_MENU.filter(s => s.area === profile.area);
  
  const menuContext = JSON.stringify(relevantServices.map(s => ({
    id: s.id,
    title: s.title,
    description: s.description.join(', '),
    price: s.price,
    bestFor: s.bestFor.join(', ')
  })));

  const systemInstruction = `
    You are an expert aesthetician for 'Dans Peau' clinic.
    Your goal is to analyze a photo of a client and their profile to recommend the ONE best service package from the provided menu.
    
    Rules:
    1. Be polite, professional, and empathetic.
    2. Analyze the image for visible conditions (acne, wrinkles, spots, dehydration for face; cellulite, sagging for body).
    3. Match the condition + user concerns to the 'bestFor' attributes in the menu.
    4. ONLY recommend a service ID that exists in the provided menu context.
    5. Estimate the number of sessions required based on the severity of the condition (e.g., "3 a 5 sesiones", "1 sesión de mantenimiento", "6 sesiones").
    6. Provide 3 simple daily routine tips customized to their skin type.
  `;

  const prompt = `
    Client Profile:
    Name: ${profile.name}
    Age: ${profile.age}
    Skin Type: ${profile.skinType}
    Main Concerns: ${profile.concerns}
    Target Area: ${profile.area}

    Available Menu:
    ${menuContext}

    Analyze the attached image and provide a recommendation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING, description: "A friendly, professional assessment of what you see in the photo." },
            recommendedPackageId: { type: Type.STRING, description: "The exact ID of the service from the provided menu." },
            reasoning: { type: Type.STRING, description: "Why this specific package is the best choice for them." },
            estimatedSessions: { type: Type.STRING, description: "Estimated count of sessions needed (e.g. '3 sesiones')." },
            routineAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 short tips for daily care."
            }
          },
          required: ["diagnosis", "recommendedPackageId", "reasoning", "estimatedSessions", "routineAdvice"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No response text from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};