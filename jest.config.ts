import type { Config } from '@jest/types';
 
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/testing/db/db.test.ts'],
    testMatch: ['**/testing/**/*.test.ts'],
    // transform: {
    //     '^.+\\.ts$': [
    //         'ts-jest',
    //         {
    //             isolatedModules: true,
    //         },
    //     ],
    // },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
 
export default config;