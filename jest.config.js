/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {tsconfig: './tsconfig.jest.json'},
    ],
  },
  setupFilesAfterEnv: ['./src/jest.setup.ts']
};