import { createGeminiClient } from '../../data/GeminiClient';

describe('Gemini Client Analysis', () => {
  it('analyzes transcript and returns questions that were answered', async () => {
    const client = createGeminiClient({ apiKey: undefined });
    const transcript = 'The customer mentioned they have a Budget and Timeline.';
    const questions = ['Budget', 'Timeline', 'Decision Makers'];

    const answeredQuestions = await client.analyzeTranscript(transcript, questions);

    expect(answeredQuestions).toContain('Budget');
    expect(answeredQuestions).toContain('Timeline');
    expect(answeredQuestions).not.toContain('Decision Makers');
  });
});
