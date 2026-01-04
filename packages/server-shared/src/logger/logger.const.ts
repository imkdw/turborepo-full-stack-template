export const APP_ENV = {
  TEST: 'test',
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

export type AppEnv = (typeof APP_ENV)[keyof typeof APP_ENV];

export const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
} as const;

export type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
