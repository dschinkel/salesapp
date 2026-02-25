import React, { ChangeEvent } from 'react';
import { useQuestions } from './useQuestions';

export function QuestionUpload() {
  const { uploadQuestions } = useQuestions();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const questions = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        uploadQuestions(questions);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 mb-8 bg-slate-50 rounded-lg border border-slate-200">
      <label 
        htmlFor="csv-upload" 
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        Upload CSV of questions (one per line)
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100
          cursor-pointer"
      />
    </div>
  );
}
