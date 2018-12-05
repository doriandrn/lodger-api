module.exports = {
  verbose: true,
  bail: true,
  coverageReporters: ['html', 'text'],
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
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '~/(.*)$': '<rootDir>/src/$1',
    'defs/(.*)$': '<rootDir>/src/lib/defs/$1',
    'build/(.*)$': '<rootDir>/src/lib/build/$1',
    'forms/(.*)$': '<rootDir>/src/lib/forms/$1',
    'lodger.config': '<rootDir>/lodger.config'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  preset: 'ts-jest',
  // transformIgnorePatterns: ['/node_modules/', '/lodger/'],
  // testRegex: '(/__tests__/.*| (\\.| /)(test|spec))\\.(jsx?|tsx?)$'
  testRegex: null
}
