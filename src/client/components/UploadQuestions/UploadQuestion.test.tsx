import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UploadQuestions } from './UploadQuestions.tsx';
import * as fs from 'fs';
import * as path from 'path';

describe('Upload Questions', () => {
  test('shows uploaded questions', () => {
    const onUpload = (file: File) => {};
    render(<UploadQuestions onUpload={onUpload} />);
    expect(screen.getByLabelText(/upload csv/i)).toBeInTheDocument();
  });

  test('initiates the upload', () => {
    let uploadedFile: File | null = null;
    const onUpload = (file: File) => {
      uploadedFile = file;
    };
    render(<UploadQuestions onUpload={onUpload} />);

    const csvContent = fs.readFileSync(path.resolve(__dirname, '../../../../test/questions.csv'), 'utf-8');
    const file = new File([csvContent], 'questions.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload csv/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(uploadedFile).toBe(file);
  });
});
