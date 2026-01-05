import { NestFactory } from '@nestjs/core';
import { MyConfigService } from '@repo/server-shared';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { APP_ENV, AppEnv } from '@repo/consts';

function getCorsConfig(env: AppEnv) {
  const corsOrigins = [/^https?:\/\/domain\.com$/, /^https?:\/\/.*\.domain\.com$/];

  if (env !== APP_ENV.PRODUCTION) {
    corsOrigins.push(/^https?:\/\/localhost:([0-9]{1,5})$/);
    corsOrigins.push(/^https?:\/\/localhost$/);
  }

  return { origin: corsOrigins, credentials: true };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(MyConfigService);

  const port = configService.get('API_PORT');
  const env = configService.get('APP_ENV');

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors(getCorsConfig(env));
  app.use(helmet());

  await app.listen(port);
}
bootstrap();
