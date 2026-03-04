import { createGeminiClient } from './GeminiClient';

describe('Gemini Client', () => {
  it('parses analysis response wrapped in markdown code fences', async () => {
    const fakeGenAI = {
      models: {
        generateContent: async () => ({
          text: '```json\n["Budget","Timeline"]\n```',
        }),
      },
    };

    const client = createGeminiClient({ apiKey: 'test-key', genAI: fakeGenAI as any });
    const result = await client.analyzeTranscript('Budget and Timeline were discussed', ['Budget', 'Timeline', 'Topic']);

    expect(result).toEqual(['Budget', 'Timeline']);
  });

  it('parses analysis response from object payload', async () => {
    const fakeGenAI = {
      models: {
        generateContent: async () => ({
          text: '{"answeredQuestions":["Competition","Budget"]}',
        }),
      },
    };

    const client = createGeminiClient({ apiKey: 'test-key', genAI: fakeGenAI as any });
    const result = await client.analyzeTranscript('Competition and Budget were discussed', ['Competition', 'Budget', 'Topic']);

    expect(result).toEqual(['Competition', 'Budget']);
  });
});
