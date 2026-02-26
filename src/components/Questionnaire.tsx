import React from 'react';
import { useReorderQuestions } from './useReorderQuestions';

export interface QuestionsProps {
  questions: string[];
  draggedIndex?: number | null;
  onDragStart?: (index: number, e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop?: (index: number, e: React.DragEvent<HTMLLIElement>) => void;
}

export function Questionnaire({
  questions,
  onReorder,
}: {
  questions: string[];
  onReorder: (from: number, to: number) => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col shadow-lg rounded-xl overflow-hidden border border-slate-200 dark:border-cambria-border transition-colors duration-200">
      <Header length={questions.length} />
      <Questions questions={questions} onReorder={onReorder} />
      <NoQuestionsFound questions={questions} />
    </div>
  );
}

function Header(props: { length: number }) {
  return (
    <div className="bg-slate-100 dark:bg-[#222222] p-6 border-b border-slate-200 dark:border-cambria-borderLight transition-colors duration-200">
      <QuestionsHeader length={props.length} />
      <QuestionsDescription />
    </div>
  );
}

function Questions({ questions, onReorder }: { questions: string[]; onReorder: (from: number, to: number) => void }) {
  const { draggedIndex, onDragStart, onDragOver, onDragEnd, onDrop } = useReorderQuestions({ onReorder });

  if (questions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-cambria-panelDark p-4 transition-colors duration-200">
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <Question
            key={index}
            onDragStart={(e) => onDragStart && onDragStart(index, e)}
            onDragOver={(e) => onDragOver && onDragOver(e)}
            onDrop={(e) => onDrop && onDrop(index, e)}
            onDragEnd={(e) => onDragEnd && onDragEnd()}
            isDraggable={!!onDragStart}
            isDragged={draggedIndex === index}
            question={question}
          />
        ))}
      </ul>
    </div>
  );
}

function QuestionsDescription() {
  return (
    <p className="text-sm text-slate-600 dark:text-[#A09080] leading-relaxed">
      Add key points or topics that should be mentioned during the call. They'll be automatically checked off when
      detected in the transcript.
    </p>
  );
}

function Question(props: {
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  isDraggable: boolean;
  isDragged: boolean;
  question: string;
}) {
  return (
    <li
      draggable={props.isDraggable}
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
      onDragEnd={props.onDragEnd}
      className={`p-4 bg-slate-50 dark:bg-cambria-panelLight rounded-lg border border-slate-200 dark:border-cambria-border shadow-sm hover:shadow-md transition-all duration-200 text-slate-800 dark:text-cambria-cream font-medium flex items-center gap-3 ${props.isDragged ? 'opacity-50 scale-[0.98]' : ''} ${props.isDraggable ? 'cursor-move' : ''}`}
    >
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-slate-400 dark:bg-cambria-gold opacity-50"></div>
      {props.question}
    </li>
  );
}

function QuestionsTitle() {
  return <h3 className="text-xl font-bold text-slate-800 dark:text-[#C5A55A] tracking-wide">Key Points</h3>;
}

function QuestionsHeader(props: { length: number }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <QuestionsTitle />
      <QuestionCount length={props.length} />
    </div>
  );
}

function QuestionCount(props: { length: number }) {
  return (
    <span className="text-sm font-medium text-slate-600 dark:text-white/80 bg-slate-200 dark:bg-black/10 px-3 py-1 rounded-full">
      {props.length} questions
    </span>
  );
}

const NoQuestionsFound = ({ questions }: { questions: string[] }) => {
  if (questions.length > 0) return null;
  return (
    <div className="text-center py-12 bg-slate-50 dark:bg-cambria-panelLight rounded-lg border-2 border-dashed border-slate-300 dark:border-cambria-border transition-colors duration-200">
      <p className="text-slate-500 dark:text-cambria-muted font-medium">
        No questions found. Upload a CSV to get started.
      </p>
    </div>
  );
};
