import React from 'react';

export interface QuestionListProps {
  questions: string[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {questions.length > 0 && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-700">Key Points</h3>
          <span className="text-sm text-slate-500">{questions.length} questions</span>
        </div>
      )}
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
