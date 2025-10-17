import { createLogger, format, transports } from 'winston';
import * as path from 'path';

const logPath = path.join(process.cwd(), 'src', 'logger', 'logger.txt');

export const appLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: logPath })],
});
