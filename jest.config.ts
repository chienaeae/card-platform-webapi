import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/__test__/', '<rootDir>/src/'],
    transform:{
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/__test__/**/*.ts', '<rootDir>/src/**/*.ts'],
    setupFiles: [
        'dotenv/config'
    ]
}

export default config;