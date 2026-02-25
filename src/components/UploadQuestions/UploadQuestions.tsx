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
    <div className="w-full max-w-2xl mx-auto p-4 mb-8 bg-slate-50 rounded-lg border border-slate-200">
      <Label 
        htmlFor="csv-upload"
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        Upload CSV of questions (one per line)
      </Label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="cursor-pointer"
      />
    </div>
  );
}
