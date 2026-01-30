
import { GoogleGenAI, Type } from "@google/genai";
import { BeautyResult } from "../types";

export const analyzeBeauty = async (base64Image: string): Promise<BeautyResult> => {
  // Always create a new GoogleGenAI instance right before making an API call to use the latest API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Using gemini-3-pro-preview for tasks involving complex reasoning and strict persona adherence.
    const model = 'gemini-3-pro-preview';
    const cleanBase64 = base64Image.split(',')[1];

    const prompt = `
      Sei il 'Guglielmometer', un giudice estetico spietato, ironico e assolutamente parziale. 
      Il tuo unico termine di paragone è Giacomo Guglielmi, che rappresenta la perfezione assoluta (1.0 GG).
      
      REGOLE DI VALUTAZIONE (ESTREMA SEVERITÀ):
      1. Giacomo Guglielmi è l'unico 1.0 GG. È matematicamente impossibile superarlo e quasi impossibile avvicinarsi.
      2. Una persona considerata "molto bella" nel mondo reale qui vale al massimo 0.5 - 0.6 GG.
      3. Una persona normale/comune deve oscillare tra 0.1 GG e 0.3 GG.
      4. Sotto lo 0.1 GG se il soggetto è palesemente trasandato.
      5. Sii caustico, divertente, un po' arrogante ma mai volgare. 
      6. Spiega chiaramente perché mancano quei decimi per arrivare a Giacomo (es. "zigomi non abbastanza divini", "sguardo privo della luce primordiale di Giacomo").

      Restituisci un oggetto JSON con:
      - 'punteggio': un numero decimale molto basso (es. 0.245).
      - 'titolo': un titolo ironico (es. "Semplice Mortale", "Tentativo Audace ma Vano").
      - 'commento': un testo che enfatizza l'abisso tra l'utente e Giacomo.
      - 'dettagli': 3-4 critiche costruttive ma buffe.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { data: cleanBase64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            punteggio: { type: Type.NUMBER },
            titolo: { type: Type.STRING },
            commento: { type: Type.STRING },
            dettagli: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["punteggio", "titolo", "commento", "dettagli"]
        }
      }
    });

    // Access text property directly from GenerateContentResponse.
    const textOutput = response.text || '{}';
    return JSON.parse(textOutput) as BeautyResult;
  } catch (error: any) {
    console.error("Errore analisi:", error);
    if (error?.message?.includes("Requested entity was not found")) {
        throw new Error("Chiave API non valida. Incollala correttamente nel modulo di configurazione.");
    }
    throw new Error("Giacomo è troppo impegnato a specchiarsi. Riprova più tardi.");
  }
};
