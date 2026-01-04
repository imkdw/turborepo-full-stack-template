import { z } from 'zod';

import { APP_ENV } from '../logger/logger.const';

export const myConfigSchema = z.object({
  DATABASE_URL: z.string(),
  API_PORT: z.coerce.number(),
  APP_ENV: z.enum([APP_ENV.TEST, APP_ENV.LOCAL, APP_ENV.DEVELOPMENT, APP_ENV.PRODUCTION]),
});

export type MyConfig = z.infer<typeof myConfigSchema>;
