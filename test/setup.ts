import '@testing-library/jest-dom';

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        PACKAGE_VERSION: '1.0.0-test',
      },
    },
  },
});
