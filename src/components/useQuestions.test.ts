import { renderHook } from '@testing-library/react';
import { useQuestions } from './useQuestions';

describe('Questions', () => {
  test('lists questions', () => {
    const { result } = renderHook(() => useQuestions());

    const expectedQuestions = [
      'Company Name',
      'Topic',
      'Customer\'s Objectives',
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy'
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });
});
