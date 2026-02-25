import { renderHook, act } from '@testing-library/react';
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

  test('uploads new questions', () => {
    const { result } = renderHook(() => useQuestions());
    const newQuestions = ['New Question 1', 'New Question 2'];

    act(() => {
      result.current.uploadQuestions(newQuestions);
    });

    expect(result.current.questions).toEqual(newQuestions);
  });
});
