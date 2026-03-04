export const parseFile = async (file: File): Promise<string[]> => {
  return new Promise<string[]>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        resolve(parseQuestions(text));
      } else {
        resolve([]);
      }
    };
    reader.readAsText(file);
  });
};

function parseQuestions(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
