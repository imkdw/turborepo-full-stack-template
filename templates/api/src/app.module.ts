import { AppController } from '@/app.controller';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  AllExceptionFilter,
  createLoggerConfig,
  CustomExceptionFilter,
  DatabaseModule,
  env,
  LoggingInterceptor,
  TransformInterceptor,
} from '@repo/server-shared';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    WinstonModule.forRootAsync({
      useFactory: () => {
        return createLoggerConfig(env.APP_ENV);
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
