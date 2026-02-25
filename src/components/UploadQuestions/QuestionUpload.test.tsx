import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UploadQuestions } from './UploadQuestions.tsx';

describe('Upload Questions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows upload questions', () => {
    render(<UploadQuestions onUpload={jest.fn()} />);
    expect(screen.getByLabelText(/upload csv/i)).toBeInTheDocument();
  });

  test('calls onUpload prop when file is selected', () => {
    const mockOnUpload = jest.fn();
    render(<UploadQuestions onUpload={mockOnUpload} />);
    const file = new File(['Question 1'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload csv/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });
});
