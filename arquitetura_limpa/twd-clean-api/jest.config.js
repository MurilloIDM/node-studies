/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/test/**",
    "!**/config/**"
  ],
  transform: {
    ".+\\.ts$": 'ts-jest'
  }
};
