import { join } from 'path';

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { myConfigSchema } from './my-config.schema';
import { MyConfigService } from './my-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: join(process.cwd(), '../../.env'),
      validate: config => myConfigSchema.parse(config),
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
