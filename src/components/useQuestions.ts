import { useState } from 'react';

const initialQuestions = [
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

export function useQuestions() {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const appendQuestions = (newQuestions: string[]) => {
    setQuestions((prev) => [...prev, ...newQuestions]);
  };

  const reorderQuestion = (fromIndex: number, toIndex: number) => {
    setQuestions((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  return {
    questions,
    appendQuestions,
    reorderQuestion,
  };
}
