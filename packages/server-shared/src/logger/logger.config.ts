import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

import { APP_ENV, AppEnv, LOG_LEVEL, LogLevel } from './logger.const';

const { combine, timestamp, ms, errors, splat, colorize, printf, json } = winston.format;

function getAppEnv(): AppEnv {
  return (process.env.APP_ENV || process.env.NODE_ENV || APP_ENV.LOCAL) as AppEnv;
}

function localFormat(): winston.Logform.Format {
  return combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ms(),
    errors({ stack: true }),
    splat(),
    colorize({ all: true }),
    printf(({ level, message, timestamp, ms, context, stack }) => {
      const contextStr = context ? `[${context}]` : '';
      const stackStr = stack ? `\n${stack}` : '';
      return `${timestamp} ${ms} ${level} ${contextStr} ${message}${stackStr}`;
    })
  );
}

function productionFormat(): winston.Logform.Format {
  return combine(timestamp(), ms(), errors({ stack: true }), splat(), json());
}

function getLogLevel(env: AppEnv): LogLevel {
  return env === APP_ENV.LOCAL ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO;
}

function getTransports(env: AppEnv): winston.transport[] {
  switch (env) {
    case APP_ENV.TEST:
      return [
        new winston.transports.Console({
          silent: true,
        }),
      ];

    case APP_ENV.LOCAL:
      return [
        new winston.transports.Console({
          format: localFormat(),
        }),
      ];

    case APP_ENV.DEVELOPMENT:
    case APP_ENV.PRODUCTION:
    default:
      return [
        new winston.transports.Console({
          format: productionFormat(),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: LOG_LEVEL.ERROR,
          format: productionFormat(),
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: productionFormat(),
        }),
      ];
  }
}

type FileHandlersConfig = Pick<WinstonModuleOptions, 'exceptionHandlers' | 'rejectionHandlers'>;

function getFileHandlers(env: AppEnv): Partial<FileHandlersConfig> {
  if (env === APP_ENV.TEST || env === APP_ENV.LOCAL) {
    return {};
  }

  return {
    exceptionHandlers: [
      new winston.transports.File({
        filename: 'logs/exceptions.log',
        format: productionFormat(),
      }),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: 'logs/exceptions.log',
        format: productionFormat(),
      }),
    ],
  };
}

export const loggerConfig: WinstonModuleOptions = (() => {
  const env = getAppEnv();

  return {
    level: getLogLevel(env),
    transports: getTransports(env),
    ...getFileHandlers(env),
  };
})();
