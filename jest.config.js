module.exports = {
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        '<rootDir>/**/*.tsx',
        '!<rootDir>/index.tsx',
        '!<rootDir>/components/icons/*.tsx',
        '!<rootDir>/stories/**',
    ],
    coverageThreshold: {
        global: {
            statements: 93,
            branches: 88,
            functions: 91,
            lines: 93,
        },
    },
    testPathIgnorePatterns: ['jest.setup.ts$'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/testFileStub.tsx',
        '\\.(css|scss)$': '<rootDir>/__mocks__/emptyModule.tsx',
    },
    rootDir: './src',
    setupFilesAfterEnv: [
        '<rootDir>/__tests__/jest.setup.ts',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    preset: 'ts-jest',
};
