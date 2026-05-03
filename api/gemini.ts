import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with the private key from environment variables
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: apiKey || "" });

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { task, payload } = req.body;

  if (!apiKey) {
    return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
  }

  try {
    let result;

    switch (task) {
      case 'generateContent':
        const response = await genAI.models.generateContent({
            model: payload.model || "gemini-2.0-flash",
            contents: payload.contents,
            config: payload.config
        });
        
        result = { 
            text: response.text, 
            groundingMetadata: response.candidates?.[0]?.groundingMetadata,
            image: response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData
        };
        break;

      case 'generateSpeech':
        // For TTS, we use the specific modality config in the new SDK
        const ttsResponse = await genAI.models.generateContent({
            model: payload.model || "gemini-2.0-flash",
            contents: payload.contents,
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: payload.voice || 'Kore' },
                    },
                },
                ...payload.config
            },
        });
        
        const audioData = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        result = { audioData };
        break;

      default:
        return res.status(400).json({ error: `Unknown task: ${task}` });
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error(`Error in Gemini API [${task}]:`, error);
    return res.status(500).json({ 
        error: "Failed to process AI request", 
        details: error.message 
    });
  }
}
