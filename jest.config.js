module.exports = {
  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|e2e).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/dist/**', '!**/e2e/**'],
  coveragePathIgnorePatterns: ['node_modules', 'index.ts', 'main.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      functions: 90,
      lines: 90,
      statements: 90,
      branches: 90,
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: 'coverage/test-report.html',
      },
    ],
  ],
};
