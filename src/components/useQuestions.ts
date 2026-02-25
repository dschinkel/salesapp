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

  const parseAndUploadQuestions = async (file: File) => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          uploadQuestions(parseQuestions(text));
        }
        resolve();
      };
      reader.readAsText(file);
    });
  };

  return {
    questions,
    uploadQuestions,
    parseAndUploadQuestions
  };
}

function parseQuestions(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
