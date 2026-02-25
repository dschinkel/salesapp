import React, { ChangeEvent } from 'react';
import { useQuestions } from '../useQuestions.ts';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function UploadQuestions() {
  const { parseAndUploadQuestions } = useQuestions();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseAndUploadQuestions(file);
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
