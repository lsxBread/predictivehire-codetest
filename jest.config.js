module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  // "testResultsProcessor": "jest-sonar-reporter",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{ts,js}",
    "!**/node_modules/**"
  ],
  "coverageDirectory": "dist",
  "coverageReporters": ["lcov"],
  coverageThreshold: {
    global: {
      functions: 90,
      lines: 90,
      statements: 90,
      branches: 90
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        'outputPath': 'dist/test-report.html'
      },
    ],
  ],
}