module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',    
    '^@/(.*)$': '<rootDir>/src/$1',

    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@filter/(.*)$': '<rootDir>/src/components/Filter/$1',
    '^@filterItem/(.*)$': '<rootDir>/src/components/FilterItem/$1',
    '^@track/(.*)$': '<rootDir>/src/components/Track/$1',
    '^@navigation/(.*)$': '<rootDir>/src/components/Navigation/$1',
    '^@sidebar/(.*)$': '<rootDir>/src/components/Sidebar/$1',
    '^@search/(.*)$': '<rootDir>/src/components/Search/$1',
    '^@centerblock/(.*)$': '<rootDir>/src/components/Centerblock/$1',
    '^@tracklist/(.*)$': '<rootDir>/src/components/Tracklist/$1',
    '^@listheader/(.*)$': '<rootDir>/src/components/Listheader/$1',
    '^@loading/(.*)$': '<rootDir>/src/components/Loading/$1',
    '^@bar/(.*)$': '<rootDir>/src/components/Bar/$1',
    '^@progressBar/(.*)$': '<rootDir>/src/components/ProgressBar/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@sharedTypes/(.*)$': '<rootDir>/src/sharedTypes/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@auth/(.*)$': '<rootDir>/src/app/auth/$1',
    '^@signin/(.*)$': '<rootDir>/src/app/auth/signin/$1',
    '^@signup/(.*)$': '<rootDir>/src/app/auth/signup/$1',
  },
  
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
    }],
  },
};