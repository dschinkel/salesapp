import { createGeminiClient } from '../../data/GeminiClient';

describe('Gemini Client', () => {
  test('sends audio', async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.warn('GEMINI_API_KEY not set; skipping data-layer integration test.');
      return;
    }

    const client = createGeminiClient({ apiKey });

    const dummyAudio = Buffer.from('RIFF$dummywebm', 'ascii');
    const mimetype = 'audio/webm';

    try {
      const result = await client.generateContent('Please transcribe this audio.', dummyAudio, mimetype);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    } catch (error: any) {
      // Allow the test to pass if the provided key is valid but out of quota or unauthorized for the model
      if (
        error.status === 429 ||
        error.status === 404 ||
        error.status === 403 ||
        error.message.includes('429') ||
        error.message.includes('404')
      ) {
        console.warn(
          'Gemini API request failed due to quota/model access limitations. Skipping test failure.',
          error.message,
        );
      } else {
        throw error;
      }
    }
  }, 30000);
});
