import type { Config } from 'jest';
import baseConfig from '../../jest.config';

const e2eConfig: Config = {
  ...baseConfig,
  rootDir: '../..',
  testMatch: ['<rootDir>/test/e2e/**/*.spec-e2e.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/integration/setup.ts'],
  testTimeout: 30000,
};

export default e2eConfig;
