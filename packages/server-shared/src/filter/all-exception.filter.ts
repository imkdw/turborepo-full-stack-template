import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { APP_ENV } from '@repo/consts';
import { ExceptionResponse } from '@repo/types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { env } from '../config';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException
      ? (exception.getResponse() as ExceptionResponse)
      : ({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          errorCode: 'INTERNAL_SERVER_ERROR',
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          stack: (exception as Error).stack ?? '',
        } satisfies ExceptionResponse);

    const responseBody: ExceptionResponse = {
      statusCode: httpStatus,
      errorCode: exceptionResponse.errorCode,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      stack: env.APP_ENV === APP_ENV.LOCAL ? exceptionResponse.stack : undefined,
    };

    this.logger.error('Exception occurred', {
      ...responseBody,
      message: (exception as Error).message,
      originalStack: (exception as Error).stack,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
