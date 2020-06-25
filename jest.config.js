module.exports = {
  verbose: true,
  bail: 1,
  coverageReporters: [
    'html',
    'text'
  ],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false
    }
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'd.ts',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '~/(.*)$': '<rootDir>/src/$1',
    'defs/(.*)$': '<rootDir>/src/lib/defs/$1',
    'lodger-build/(.*)$': '<rootDir>/src/lib/build/$1',// just "build" is not ok
    'forms/(.*)$': '<rootDir>/src/forms/$1',
    'helper/(.*)$': '<rootDir>/src/lib/helpers/$1',
    'fixtures/(.*)$': '<rootDir>/src/__fixtures__/$1',
    'lodger.config': '<rootDir>/src/lodger.config',
    'dynamic-targets': '<rootDir>/src/lib/helpers/dev/jest-dynamic-targets'
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/__fixtures__/",
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  preset: 'ts-jest',
  // transformIgnorePatterns: ['/node_modules/', '/lodger/'],
  // testRegex: '(/__tests__/.*| (\\.| /)(test|spec))\\.(jsx?|tsx?)$'
  testRegex: null
}
