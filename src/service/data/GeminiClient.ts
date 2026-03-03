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

      try {
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
      } catch (error: any) {
        console.error('Gemini generateContent error:', error.status, error.message);
        throw error;
      }
    },

    async analyzeTranscript(transcript: string, questions: string[]): Promise<string[]> {
      if (!apiKey) {
        // Simple heuristic for test/mock when API key is missing
        return questions.filter((q) => transcript.toLowerCase().includes(q.toLowerCase()));
      }

      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          generationConfig: { responseMimeType: 'application/json' },
        });

        const prompt = `
        Analyze the following transcript and determine which of the provided key points or questions were answered.
        Return the result as a JSON array of strings containing exactly the original question text for each answered point.
        
        Transcript: "${transcript}"
        Questions: ${JSON.stringify(questions)}
      `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
      } catch (error: any) {
        console.error('Gemini analyzeTranscript error:', error.status, error.message);
        throw error;
      }
    },
  };
}
