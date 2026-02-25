import React, { useState } from 'react';

export interface QuestionListProps {
  questions: string[];
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export function QuestionList({ questions, onReorder }: QuestionListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index && onReorder) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {questions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-700">Key Points</h3>
            <span className="text-sm text-slate-500">{questions.length} questions</span>
          </div>
          <p className="text-sm text-slate-600">
            Add key points or topics that should be mentioned during the call. They'll be automatically checked off when detected in the transcript.
          </p>
        </div>
      )}
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li 
            key={index} 
            draggable={!!onReorder}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${draggedIndex === index ? 'opacity-50' : ''} ${!!onReorder ? 'cursor-move' : ''}`}
          >
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
