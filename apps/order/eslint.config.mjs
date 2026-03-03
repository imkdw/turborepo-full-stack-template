import { config } from '@repo/eslint-config/react-internal';

export default [
  ...config,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'eslint.config.mjs',
      'postcss.config.mjs',
      'vite.config.d.ts',
      'vite.config.js',
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
