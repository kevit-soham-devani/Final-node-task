module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],  // Specifies the test file pattern
    moduleFileExtensions: ['ts', 'js'],  // Allows Jest to recognize TypeScript and JavaScript files
  };
  