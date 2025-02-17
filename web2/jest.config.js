module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/tests/unit/**/*.test.[jt]s?(x)",
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
