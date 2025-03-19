// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// backend/src/main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS so frontend can call your API
  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

