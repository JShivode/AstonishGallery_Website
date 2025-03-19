// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Load environment variables from .env (isGlobal: true makes them accessible everywhere)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Connect to MongoDB using an environment variable, with a fallback string if not provided
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/astonishgallery'),

    // Import additional feature modules here, for example:
    // UsersModule,
    // AlbumsModule,
    // ImagesModule,
  ],
  controllers: [
    // Add your controllers here
  ],
  providers: [
    // Add your providers/services here
  ],
})
export class AppModule {}
