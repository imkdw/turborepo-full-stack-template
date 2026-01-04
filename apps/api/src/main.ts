import { NestFactory } from '@nestjs/core';
import { MyConfigService } from '@repo/server-shared';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(MyConfigService);
  await app.listen(configService.get('API_PORT'));
}
bootstrap();
