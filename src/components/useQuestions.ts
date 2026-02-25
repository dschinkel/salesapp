import { useState } from 'react';

const initialQuestions = [
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

export function useQuestions() {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const uploadQuestions = (newQuestions: string[]) => {
    setQuestions(newQuestions);
  };

  return {
    questions,
    uploadQuestions
  };
}
