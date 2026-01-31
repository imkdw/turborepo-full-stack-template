import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

import { MyConfig, myConfigSchema } from './my-config.schema';

let _env: MyConfig | null = null;
const MONOREPO_ROOT = join(process.cwd(), '../..');

export function initEnv(): MyConfig {
  if (_env) {
    return _env;
  }

  const appEnv = process.env.APP_ENV ?? 'local';

  dotenvConfig({ path: join(MONOREPO_ROOT, `.env.${appEnv}`) });

  const parsed = myConfigSchema.parse(process.env);

  _env = Object.freeze(parsed) as MyConfig;
  return _env;
}

export const env: Readonly<MyConfig> = new Proxy({} as MyConfig, {
  get(_, key) {
    if (typeof key === 'symbol') {
      return undefined;
    }

    if (!_env) {
      throw new Error(
        `Environment not initialized. Call initEnv() before accessing env.${String(key)}. ` +
          'Ensure initEnv() is called in your application bootstrap (e.g., main.ts or test setup).'
      );
    }
    if (!(key in _env)) {
      throw new Error(`Unknown environment key: ${String(key)}`);
    }
    return _env[key as keyof MyConfig];
  },
});
