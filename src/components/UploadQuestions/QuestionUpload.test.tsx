import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UploadQuestions } from './UploadQuestions.tsx';

const mockParseAndUploadQuestions = jest.fn();

jest.mock('../useQuestions.ts', () => ({
  useQuestions: () => ({
    parseAndUploadQuestions: mockParseAndUploadQuestions,
  }),
}));

describe('Upload Questions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows upload questions', () => {
    render(<UploadQuestions />);
    expect(screen.getByLabelText(/upload csv/i)).toBeInTheDocument();
  });

  test('calls parseAndUploadQuestions from hook', async () => {
    render(<UploadQuestions />);
    const file = new File(['Question 1'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload csv/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockParseAndUploadQuestions).toHaveBeenCalledWith(file);
  });
});
