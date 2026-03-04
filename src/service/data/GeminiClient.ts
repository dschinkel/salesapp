import { GoogleGenAI } from '@google/genai';
import { GeminiClient } from '../repositories/Transcription/TranscriptionRepository';

export interface GeminiClientDependencies {
  apiKey?: string;
  genAI?: {
    models: {
      generateContent: (input: any) => Promise<any>;
    };
  };
}

export function createGeminiClient({ apiKey, genAI }: GeminiClientDependencies): GeminiClient {
  if (!genAI && !apiKey) {
    throw new Error('GEMINI_API_KEY is required');
  }

  const gemini = genAI || new GoogleGenAI({ apiKey });

  return {
    async generateContent(prompt: string, audioBuffer: Buffer, mimetype: string): Promise<string> {
      const audioPart = {
        inlineData: {
          data: audioBuffer.toString('base64'),
          mimeType: mimetype,
        },
      };

      const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ text: prompt }, audioPart],
      });
      return extractText(response);
    },

    async analyzeTranscript(transcript: string, questions: string[]): Promise<string[]> {
      const prompt = `
        Analyze the following transcript and determine which of the provided key points or questions were answered.
        Return the result as a JSON array of strings containing exactly the original question text for each answered point.
        
        Transcript: "${transcript}"
        Questions: ${JSON.stringify(questions)}
      `;

      const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      const text = extractText(response);
      const answeredQuestions = parseAnsweredQuestions(text, questions);
      if (answeredQuestions.length > 0) {
        return answeredQuestions;
      }
      throw new Error(`Gemini returned an empty analysis result. Raw response: ${text}`);
    },
  };
}

function extractText(response: any): string {
  if (typeof response?.text === 'function') return response.text();
  if (typeof response?.text === 'string') return response.text;
  if (typeof response?.response?.text === 'function') return response.response.text();
  return '';
}

function parseAnsweredQuestions(text: string, questions: string[]): string[] {
  const normalizedQuestions = new Set(questions);
  const parsed = parseGeminiJson(text);
  const candidates = normalizeCandidates(parsed);
  return candidates.filter((item) => normalizedQuestions.has(item));
}

function parseGeminiJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const fencedJson = text.match(/```json\s*([\s\S]*?)\s*```/i)?.[1];
    if (fencedJson) return JSON.parse(fencedJson);
    const arrayLiteral = text.match(/\[[\s\S]*\]/)?.[0];
    if (arrayLiteral) return JSON.parse(arrayLiteral);
    throw new Error(`Gemini returned non-JSON analysis response. Raw response: ${text}`);
  }
}

function normalizeCandidates(parsed: unknown): string[] {
  if (Array.isArray(parsed)) {
    return parsed.filter((item): item is string => typeof item === 'string');
  }
  if (parsed && typeof parsed === 'object') {
    const answeredQuestions = (parsed as any).answeredQuestions;
    if (Array.isArray(answeredQuestions)) {
      return answeredQuestions.filter((item): item is string => typeof item === 'string');
    }
  }
  return [];
}
