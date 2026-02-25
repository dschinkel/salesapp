import React from 'react';
import { useQuestions } from './useQuestions';

export function QuestionList() {
  const { questions } = useQuestions();

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">Sales Conversation Questions</h2>
        <span className="text-sm text-slate-500">{questions.length} questions</span>
      </div>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            {question}
          </li>
        ))}
      </ul>
      {questions.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">No questions found. Upload a CSV to get started.</p>
        </div>
      )}
    </div>
  );
}
