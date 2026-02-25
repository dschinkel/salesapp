import React from 'react';
import { useQuestions } from './useQuestions';

export function QuestionList() {
  const { questions } = useQuestions();

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sales Conversation Questions</h2>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="p-3 bg-white rounded border shadow-sm">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}
