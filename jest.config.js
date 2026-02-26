export default {
  projects: [
    {
      displayName: 'client',
      preset: 'ts-jest',
      testEnvironment: 'jest-environment-jsdom',
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
      testMatch: [
        '<rootDir>/test/**/*.test.(ts|tsx|js|jsx)',
        '<rootDir>/src/components/**/*.test.(ts|tsx|js|jsx)',
        '<rootDir>/src/client/**/*.test.(ts|tsx|js|jsx)',
      ],
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
      },
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
    },
    {
      displayName: 'service',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/service/**/*.test.(ts|tsx|js|jsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
      },
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
    },
  ],
};
