import { useState } from 'react';

export interface UseReorderQuestionsDependencies {
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function useReorderQuestions({ onReorder }: UseReorderQuestionsDependencies) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDragStart = (index: number, e: React.DragEvent) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const onDrop = (toIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      onReorder(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
  };

  return {
    draggedIndex,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDrop,
  };
}
