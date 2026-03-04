import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { useUploadQuestions } from './useUploadQuestions';
import { useReorderQuestions } from './useReorderQuestions';

describe('Questions', () => {
  test('lists questions', () => {
    const { result } = renderHook(() => useQuestions());

    const expectedQuestions = [
      'Company Name',
      'Topic',
      "Customer's Objectives",
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy',
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });

  test('appends new questions', () => {
    const { result } = renderHook(() => useQuestions());
    const newQuestions = ['New Question 1', 'New Question 2'];

    act(() => {
      result.current.appendQuestions(newQuestions);
    });

    const expectedQuestions = [
      'Company Name',
      'Topic',
      "Customer's Objectives",
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy',
      'New Question 1',
      'New Question 2',
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });

  test('parses uploaded questions', async () => {
    const parseQuestion = async (file: File) => ['Question 1', 'Question 2', 'Question 3'];
    let uploadedQuestions: string[] = [];
    const onUpload = (questions: string[]) => {
      uploadedQuestions = questions;
    };
    const { result } = renderHook(() => useUploadQuestions(onUpload, { parseFile: parseQuestion }));
    const file = new File([''], 'test.csv', { type: 'text/csv' });

    await act(async () => {
      await result.current.parseAndUploadQuestions(file);
    });

    expect(uploadedQuestions).toEqual(['Question 1', 'Question 2', 'Question 3']);
  });

  test('reorders questions', () => {
    const { result } = renderHook(() => useQuestions());

    act(() => {
      result.current.reorderQuestion(0, 2);
    });

    const expectedQuestions = [
      'Topic',
      "Customer's Objectives",
      'Company Name',
      'Timeline',
      'Decision Makers',
      'Estimated Deal Size',
      'Competition',
      'Budget',
      'Strategy',
    ];

    expect(result.current.questions).toEqual(expectedQuestions);
  });

  test('manages reorder state', () => {
    let reorderedFrom = -1;
    let reorderedTo = -1;
    const onReorder = (from: number, to: number) => {
      reorderedFrom = from;
      reorderedTo = to;
    };
    const { result } = renderHook(() => useReorderQuestions({ onReorder }));

    let prevented = false;
    const fakeEvent = {
      preventDefault: () => {
        prevented = true;
      },
      dataTransfer: {
        effectAllowed: '',
        dropEffect: '',
      },
    } as unknown as React.DragEvent;

    act(() => {
      result.current.onDragStart(0, fakeEvent);
    });

    expect(result.current.draggedIndex).toBe(0);

    act(() => {
      result.current.onDragOver(fakeEvent);
    });

    expect(prevented).toBe(true);

    act(() => {
      result.current.onDrop(2, fakeEvent);
    });

    expect(reorderedFrom).toBe(0);
    expect(reorderedTo).toBe(2);
    expect(result.current.draggedIndex).toBe(null);
  });
});
