export interface UseUploadQuestionsDependencies {
  parseFile: (file: File) => Promise<string[]>;
}

export function useUploadQuestions(
  onUpload: (questions: string[]) => void,
  { parseFile }: UseUploadQuestionsDependencies,
) {
  const parseAndUploadQuestions = async (file: File) => {
    const parsedQuestions = await parseFile(file);
    onUpload(parsedQuestions);
  };

  return {
    parseAndUploadQuestions,
  };
}
