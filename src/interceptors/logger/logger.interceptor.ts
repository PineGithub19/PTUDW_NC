import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

import { appLogger } from 'src/utils/write-log';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      tap((value) => {
        const duration = Date.now() - startTime;

        const logObj = {
          requestInfo: {
            browser: request.get('user-agent'),
            originalUrl: request.originalUrl,
            method: request.method,
            query: request.query,
            params: request.params,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: request.body,
            headers: request.headers,
            ip: request.ip,
          },
          responseInfo: {
            statusCode: response.statusCode,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: value,
          },
          meta: {
            requestDate: new Date(startTime).toISOString(),
            durationMs: duration,
          },
        };

        appLogger.info(logObj);
      }),
    );
  }
}
