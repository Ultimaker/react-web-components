module.exports = {
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.tsx',
        '!src/index.tsx',
        '!src/components/icons/*.tsx',
        '!src/stories/*',
    ],
    coverageThreshold: {
        global: {
            statements: 93,
            branches: 88,
            functions: 91,
            lines: 93,
        },
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-web-components)/)',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testPathIgnorePatterns: ['jest.setup.ts$'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/testFileStub.tsx',
        '\\.(css|scss)$': '<rootDir>/src/__mocks__/emptyModule.tsx',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/src/__tests__/jest.setup.ts',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    preset: 'ts-jest',
};
