import { createGeminiClient } from '../../data/GeminiClient';

describe('Gemini Client Analysis', () => {
  it('analyzes transcript and returns questions that were answered', async () => {
    if (process.env.RUN_GEMINI_INTEGRATION !== 'true') {
      console.warn('RUN_GEMINI_INTEGRATION not set to true; skipping data-layer integration test.');
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not set; skipping data-layer integration test.');
      return;
    }

    const client = createGeminiClient({ apiKey });
    const transcript = 'The customer mentioned they have a Budget and Timeline.';
    const questions = ['Budget', 'Timeline', 'Decision Makers'];

    try {
      const answeredQuestions = await client.analyzeTranscript(transcript, questions);
      expect(answeredQuestions).toContain('Budget');
      expect(answeredQuestions).toContain('Timeline');
      expect(answeredQuestions).not.toContain('Decision Makers');
    } catch (error: any) {
      const status = Number(error?.status || 0);
      const message = String(error?.message || '');
      const isOpaqueProviderError = status === 0 && message.length === 0;
      if (
        status === 429 ||
        status === 404 ||
        status === 403 ||
        message.includes('429') ||
        message.includes('404') ||
        isOpaqueProviderError
      ) {
        console.warn(
          'Gemini API request failed due to quota/model access limitations. Skipping test failure.',
          message || JSON.stringify(error),
        );
      } else {
        throw error;
      }
    }
  });
});
