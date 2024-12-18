import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove fields that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if unknown fields are present
      transform: true, // Automatically transform payloads to DTO classes
    }),
  );

  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.10.15:3001',
      'http://192.168.10.15:3000',
      'https://your-frontend-domain.com',
      'http://192.168.10.10:3000',
      'http://192.168.10.10:3001',
      'https://ergonistor-production.up.railway.app',
      'https://ergonistor-manager-production.up.railway.app',
    ], // Specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  };

  app.enableCors(corsOptions);

  app.use(express.json({ limit: '20mb' })); // For JSON payloads
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  await app.listen(8000);
}
bootstrap();
