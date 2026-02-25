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


  test('appends new questions', () => {
    const { result } = renderHook(() => useQuestions());
    const newQuestions = ['New Question 1', 'New Question 2'];

    act(() => {
      result.current.uploadQuestions(newQuestions);
    });

    const expectedQuestions = [
      'Company Name',
      'Topic',
      'Customer\'s Objectives',
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy',
      'New Question 1',
      'New Question 2'
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });

  test('parses and uploads questions from a file via injected dependency', async () => {
    const fakeParseFile = async (file: File) => ['Question 1', 'Question 2', 'Question 3'];
    const { result } = renderHook(() => useQuestions({ parseFile: fakeParseFile }));
    const file = new File([''], 'test.csv', { type: 'text/csv' });

    await act(async () => {
      await result.current.parseAndUploadQuestions(file);
    });

    const expectedQuestions = [
      'Company Name',
      'Topic',
      'Customer\'s Objectives',
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy',
      'Question 1',
      'Question 2',
      'Question 3'
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });
});
