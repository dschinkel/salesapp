import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UploadQuestions } from './UploadQuestions.tsx';
import * as fs from 'fs';
import * as path from 'path';

describe('Upload Questions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows uploaded questions', () => {
    render(<UploadQuestions onUpload={jest.fn()} />);
    expect(screen.getByLabelText(/upload csv/i)).toBeInTheDocument();
  });

  test('initiates the upload', () => {
    const mockOnUpload = jest.fn();
    render(<UploadQuestions onUpload={mockOnUpload} />);
    
    const csvContent = fs.readFileSync(path.resolve(__dirname, '../../../test/questions.csv'), 'utf-8');
    const file = new File([csvContent], 'questions.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload csv/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });
});
