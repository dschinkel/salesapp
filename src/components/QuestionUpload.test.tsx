import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuestionUpload } from './QuestionUpload';

const mockUploadQuestions = jest.fn();

jest.mock('./useQuestions', () => ({
  useQuestions: () => ({
    uploadQuestions: mockUploadQuestions,
  }),
}));

describe('QuestionUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders file input', () => {
    render(<QuestionUpload />);
    expect(screen.getByLabelText(/upload csv/i)).toBeInTheDocument();
  });

  test('calls uploadQuestions when a CSV file is uploaded', async () => {
    render(<QuestionUpload />);
    const file = new File(['Question 1\nQuestion 2'], 'questions.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload csv/i);

    fireEvent.change(input, { target: { files: [file] } });

    // We expect it to be called eventually after parsing.
    // For now, let's just assert it was called.
    // Note: FileReader is asynchronous, so we might need to wait.
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockUploadQuestions).toHaveBeenCalledWith(['Question 1', 'Question 2']);
  });
});
