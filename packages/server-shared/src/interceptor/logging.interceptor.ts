import { CallHandler, ExecutionContext, HttpStatus, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Logger } from 'winston';

import { APP_ENV, AppEnv, LOG_LEVEL, LogLevel } from '../logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly env: AppEnv;

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    this.env = (process.env.APP_ENV || process.env.NODE_ENV || APP_ENV.LOCAL) as AppEnv;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, body } = request;
    const startTime = Date.now();
    const requestContext = `${method} ${url}`;

    if (this.env === APP_ENV.LOCAL) {
      this.logger.debug(`Request started`, {
        context: requestContext,
        body: this.sanitizeBody(body),
      });
    }

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode;

        this.logger.log(this.getLogLevel(statusCode), `Request completed`, {
          context: requestContext,
          statusCode,
          responseTime: `${responseTime}ms`,
        });
      }),
      catchError((error: Error) => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode >= 400 ? response.statusCode : 500;

        this.logger.error(`Request failed`, {
          context: requestContext,
          statusCode,
          responseTime: `${responseTime}ms`,
          error: error.message,
          stack: error.stack,
        });

        return throwError(() => error);
      })
    );
  }

  private getLogLevel(statusCode: number): LogLevel {
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return LOG_LEVEL.ERROR;
    }

    if (statusCode >= HttpStatus.BAD_REQUEST) {
      return LOG_LEVEL.WARN;
    }

    return LOG_LEVEL.INFO;
  }

  private sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
    if (!body || typeof body !== 'object') return body;

    const sensitiveFields = ['password', 'token', 'secret', 'authorization', 'apiKey'];
    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
