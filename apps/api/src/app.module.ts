import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { loggerConfig, LoggingInterceptor } from '@repo/server-shared';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [WinstonModule.forRoot(loggerConfig)],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
