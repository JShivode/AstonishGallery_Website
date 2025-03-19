// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create an instance of the NestJS application using AppModule
  const app = await NestFactory.create(AppModule);

  // Set the port (default to 3000 if not provided by environment variables)
  const port = process.env.PORT || 3000;
  
  // Start listening on the specified port
  await app.listen(port);

  // Log the running URL to the console for convenience
  console.log(`Application is running on: http://localhost:${port}`);
}

// Invoke the bootstrap function to start the application
bootstrap();
