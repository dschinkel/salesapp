import React, { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface UploadQuestionsProps {
  onUpload: (file: File) => void;
}

export function UploadQuestions({ onUpload }: UploadQuestionsProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 mb-8 bg-white dark:bg-cambria-panelDark rounded-xl border border-slate-200 dark:border-cambria-border shadow-lg transition-colors duration-200">
      <Label
        htmlFor="csv-upload"
        className="block text-sm font-medium text-slate-700 dark:text-cambria-cream mb-3 transition-colors duration-200"
      >
        Upload CSV of questions (one per line)
      </Label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="cursor-pointer bg-slate-50 dark:bg-cambria-panelLight border-slate-300 dark:border-cambria-border text-slate-900 dark:text-cambria-cream file:bg-slate-200 dark:file:bg-cambria-gold file:text-slate-700 dark:file:text-black file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:opacity-90 transition-opacity"
      />
    </div>
  );
}
