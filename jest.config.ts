export default {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/*.tsx',
    '!src/**/index.ts',
    '!src/**/style.ts',
    '!src/**/use*.ts',
    '!src/**/nav-items.ts',
    '!src/**/inputs.ts',
    '!src/icons/*',
    '!src/themes/*',
    '!src/firebase/*',
    '!src/states/*',
    '!src/functions/getters/*'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic'
            }
          }
        }
      }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
