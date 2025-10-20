import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
// import { LogstashService } from './logstash/logstash.service';
// import { LoggerInterceptor } from './interceptors/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setDescription('The films API description')
    .setVersion('1.0')
    .addTag('films')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties not in DTO
      forbidNonWhitelisted: true, // throw error if extra props exist
      transform: true, // auto-transform payloads to DTO classes
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // use global interceptor
  // const logger = app.get(LogstashService);
  // app.useGlobalInterceptors(new LoggerInterceptor(logger));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
