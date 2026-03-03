import React from 'react';
import { useReorderQuestions } from './useReorderQuestions';

export function Questionnaire({
  questions,
  onReorder,
}: {
  questions: string[];
  onReorder: (from: number, to: number) => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col shadow-lg rounded-xl overflow-hidden border border-border transition-colors duration-200">
      <Header length={questions.length} />
      <Questions questions={questions} onReorder={onReorder} />
      <NoQuestionsFound questions={questions} />
    </div>
  );
}

function Header(props: { length: number }) {
  return (
    <div className="bg-secondary dark:bg-panelLight p-6 border-b border-border transition-colors duration-200">
      <QuestionsHeader length={props.length} />
      <QuestionsDescription />
    </div>
  );
}

function Questions({ questions, onReorder }: { questions: string[]; onReorder: (from: number, to: number) => void }) {
  const { draggedIndex, onDragStart, onDragOver, onDragEnd, onDrop } = useReorderQuestions({ onReorder });

  if (questions.length === 0) return null;

  return (
    <div className="bg-background p-4 transition-colors duration-200">
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
    <p className="text-sm text-foreground/60 dark:text-muted-foreground leading-relaxed transition-colors duration-200">
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
      className={`p-4 bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-200 text-foreground font-medium flex items-center gap-3 ${props.isDragged ? 'opacity-50 scale-[0.98]' : ''} ${props.isDraggable ? 'cursor-move' : ''}`}
    >
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary opacity-50"></div>
      {props.question}
    </li>
  );
}

function QuestionsTitle() {
  return <h3 className="text-xl font-bold text-foreground tracking-wide transition-colors duration-200">Key Points</h3>;
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
    <span className="text-sm font-medium text-foreground/80 bg-foreground/10 px-3 py-1 rounded-full transition-colors duration-200">
      {props.length} questions
    </span>
  );
}

const NoQuestionsFound = ({ questions }: { questions: string[] }) => {
  if (questions.length > 0) return null;
  return (
    <div className="text-center py-12 bg-background rounded-lg border-2 border-dashed border-border transition-colors duration-200">
      <p className="text-muted-foreground font-medium">No questions found. Upload a CSV to get started.</p>
    </div>
  );
};
