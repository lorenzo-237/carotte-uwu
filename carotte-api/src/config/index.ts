import { config } from 'dotenv';

if (process.env.ENV_PATH) {
  config({ path: process.env.ENV_PATH });
} else {
  config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
}

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, SECRET_KEY } = process.env;

import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const logDir: string = process.env.LOG_DIR ? process.env.LOG_DIR : join(__dirname, '../logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
