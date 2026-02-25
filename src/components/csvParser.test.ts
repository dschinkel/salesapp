import { parseFile } from './csvParser';

describe('CSV Parser', () => {
  test('parses a file of questions', async () => {
    const fileContent = 'Question 1\nQuestion 2\n\n Question 3 ';
    const file = new File([fileContent], 'test.csv', { type: 'text/csv' });
    
    const result = await parseFile(file);
    
    expect(result).toEqual(['Question 1', 'Question 2', 'Question 3']);
  });
});
