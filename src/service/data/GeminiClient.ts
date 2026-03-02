import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiClient } from '../repositories/TranscriptionRepository';

export interface GeminiClientDependencies {
  apiKey?: string;
}

export function createGeminiClient({ apiKey }: GeminiClientDependencies): GeminiClient {
  const genAI = new GoogleGenerativeAI(apiKey || 'fake-key');

  return {
    async generateContent(prompt: string, audioBuffer: Buffer, mimetype: string): Promise<string> {
      if (!apiKey) {
        return 'Mock API response because GEMINI_API_KEY is missing in env';
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const audioPart = {
        inlineData: {
          data: audioBuffer.toString('base64'),
          mimeType: mimetype,
        },
      };

      const result = await model.generateContent([prompt, audioPart]);
      const response = await result.response;
      return response.text();
    },
  };
}
