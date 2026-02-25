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

export interface UseQuestionsDependencies {
  parseFile?: (file: File) => Promise<string[]>;
}

export function useQuestions({ parseFile }: UseQuestionsDependencies = {}) {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const uploadQuestions = (newQuestions: string[]) => {
    setQuestions(prev => [...prev, ...newQuestions]);
  };

  const parseAndUploadQuestions = async (file: File) => {
    if (parseFile) {
      const parsedQuestions = await parseFile(file);
      uploadQuestions(parsedQuestions);
    }
  };

  return {
    questions,
    uploadQuestions,
    parseAndUploadQuestions
  };
}
