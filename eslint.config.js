import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.vite/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ClassDeclaration',
          message: 'Classes are forbidden. Use functional modules with plain functions and objects.',
        },
        {
          selector: 'ClassExpression',
          message: 'Classes are forbidden. Use functional modules with plain functions and objects.',
        },
      ],
    },
  },
];
