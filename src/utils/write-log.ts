import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const logPath = path.join(process.cwd(), 'src', 'logs');

const fileRotateTransport = new transports.DailyRotateFile({
  dirname: logPath,
  filename: 'logger_%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '1k',
  maxFiles: '2',
});

export const appLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [fileRotateTransport],
});
