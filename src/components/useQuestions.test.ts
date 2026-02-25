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

  test('parses and uploads questions from a file', async () => {
    const { result } = renderHook(() => useQuestions());
    const fileContent = 'Question 1\nQuestion 2\n\n Question 3 ';
    const file = new File([fileContent], 'test.csv', { type: 'text/csv' });

    await act(async () => {
      await result.current.parseAndUploadQuestions(file);
    });

    expect(result.current.questions).toEqual(['Question 1', 'Question 2', 'Question 3']);
  });
});
