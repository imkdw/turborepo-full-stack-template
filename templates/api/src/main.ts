import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_ENV, AppEnv } from '@repo/consts';
import { env, initEnv } from '@repo/server-shared';
import expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';

import { AppModule } from './app.module';

function getCorsConfig(appEnv: AppEnv) {
  // TODO: Replace 'your-domain.com' with your actual production domain
  const corsOrigins = [/^https?:\/\/your-domain\.com$/, /^https?:\/\/.*\.your-domain\.com$/];

  if (appEnv !== APP_ENV.PRODUCTION) {
    corsOrigins.push(/^https?:\/\/localhost:([0-9]{1,5})$/);
    corsOrigins.push(/^https?:\/\/localhost$/);
  }

  return { origin: corsOrigins, credentials: true };
}

function setupSwagger(app: INestApplication) {
  const appEnv = env.APP_ENV;

  if (appEnv === APP_ENV.PRODUCTION) {
    return;
  }

  const SWAGGER_PATH = 'api';

  if (appEnv !== APP_ENV.LOCAL) {
    const username = env.SWAGGER_USERNAME;
    const password = env.SWAGGER_PASSWORD;

    if (username && password) {
      app.use(
        `/${SWAGGER_PATH}`,
        expressBasicAuth({
          challenge: true,
          users: { [username]: password },
        })
      );
    }
  }

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
    },
    jsonDocumentUrl: `${SWAGGER_PATH}/json`,
  });
}

async function bootstrap() {
  initEnv();

  const app = await NestFactory.create(AppModule);

  const port = env.API_PORT;
  const appEnv = env.APP_ENV;

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors(getCorsConfig(appEnv));
  app.use(helmet());

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
