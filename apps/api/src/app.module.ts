import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  AllExceptionFilter,
  createLoggerConfig,
  CustomExceptionFilter,
  LoggingInterceptor,
  MyConfigModule,
  MyConfigService,
} from '@repo/server-shared';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    MyConfigModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: MyConfigService) => {
        return createLoggerConfig(configService.get('APP_ENV'));
      },
      inject: [MyConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
