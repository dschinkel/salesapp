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
    <div className="w-full max-w-2xl mx-auto p-6 mb-8 bg-background rounded-xl border border-border shadow-lg transition-colors duration-200">
      <Label
        htmlFor="csv-upload"
        className="block text-sm font-medium text-foreground mb-3 transition-colors duration-200"
      >
        Upload CSV of questions (one per line)
      </Label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="cursor-pointer bg-background border-border text-foreground file:bg-secondary file:text-foreground file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:opacity-90 transition-all duration-200"
      />
    </div>
  );
}
