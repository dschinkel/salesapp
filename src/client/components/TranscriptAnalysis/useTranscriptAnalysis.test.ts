import { renderHook, act } from '@testing-library/react';
import { useTranscriptAnalysis } from './useTranscriptAnalysis.ts';

describe('Transcript Analysis', () => {
  it('analyzes transcript and returns answered questions', async () => {
    const answeredQuestions = ['What is the company name?'];
    const fakeRepository = {
      analyze: async () => answeredQuestions,
    };

    const { result } = renderHook(() => useTranscriptAnalysis({ analysisRepository: fakeRepository }));

    await act(async () => {
      await result.current.analyzeTranscript('The company name is Acme Corp.', ['What is the company name?']);
    });

    expect(result.current.answeredQuestions).toEqual(answeredQuestions);
  });
});
