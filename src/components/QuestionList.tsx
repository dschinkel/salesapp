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
    <div className="w-full max-w-2xl mx-auto flex flex-col shadow-lg rounded-xl overflow-hidden border border-cambria-border">
      {questions.length > 0 && (
        <div className="bg-cambria-gold bg-cambria-gold-gradient p-6 border-b border-cambria-borderLight">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white tracking-wide">Key Points</h3>
            <span className="text-sm font-medium text-white/80 bg-black/10 px-3 py-1 rounded-full">{questions.length} questions</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Add key points or topics that should be mentioned during the call. They'll be automatically checked off when detected in the transcript.
          </p>
        </div>
      )}
      <div className="bg-cambria-cream p-4">
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li 
              key={index} 
              draggable={!!onReorder}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-4 bg-white rounded-lg border border-cambria-muted shadow-sm hover:shadow-md transition-all duration-200 text-cambria-panelDark font-medium flex items-center gap-3 ${draggedIndex === index ? 'opacity-50 scale-[0.98]' : ''} ${!!onReorder ? 'cursor-move' : ''}`}
            >
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cambria-goldDark opacity-50"></div>
              {question}
            </li>
          ))}
        </ul>
        {questions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-cambria-muted">
            <p className="text-cambria-mutedDark font-medium">No questions found. Upload a CSV to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
