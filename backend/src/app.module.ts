// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Image, ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/astonishgallery'),

    // Register your schemas here
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
