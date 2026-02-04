import { nextJsConfig } from '@repo/eslint-config/next-js';

export default [
  ...nextJsConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'eslint.config.mjs',
      'postcss.config.mjs',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
