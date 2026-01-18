import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['eslint.config.js', 'dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // CLI tool uses console for user output
      'no-console': 'off',
    },
  },
];
