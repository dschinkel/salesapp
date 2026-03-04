import { createGeminiClient } from './GeminiClient';

describe('Gemini Client', () => {
  it('returns answered questions based on transcript', async () => {
    const fakeGenAI = {
      models: {
        generateContent: async () => ({
          text: '```json\n["Budget","Timeline"]\n```',
        }),
      },
    };

    const client = createGeminiClient({ apiKey: 'test-key', genAI: fakeGenAI as any });
    const result = await client.analyzeTranscript('Budget and Timeline were discussed', [
      'Budget',
      'Timeline',
      'Topic',
    ]);

    expect(result).toEqual(['Budget', 'Timeline']);
  });

  it('returns answered questions list', async () => {
    const fakeGenAI = {
      models: {
        generateContent: async () => ({
          text: '{"answeredQuestions":["Competition","Budget"]}',
        }),
      },
    };

    const client = createGeminiClient({ apiKey: 'test-key', genAI: fakeGenAI as any });
    const result = await client.analyzeTranscript('Competition and Budget were discussed', [
      'Competition',
      'Budget',
      'Topic',
    ]);

    expect(result).toEqual(['Competition', 'Budget']);
  });
});
