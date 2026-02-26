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

export interface UseQuestionsDependencies {
  parseFile?: (file: File) => Promise<string[]>;
}

export function useQuestions({ parseFile }: UseQuestionsDependencies = {}) {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const uploadQuestions = (newQuestions: string[]) => {
    setQuestions((prev) => [...prev, ...newQuestions]);
  };

  const parseAndUploadQuestions = async (file: File) => {
    if (parseFile) {
      const parsedQuestions = await parseFile(file);
      uploadQuestions(parsedQuestions);
    }
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
    uploadQuestions,
    parseAndUploadQuestions,
    reorderQuestion,
  };
}
