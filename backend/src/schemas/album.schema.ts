// src/schemas/album.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;

  // This references the user who owns the album
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  // Optionally, you can store an array of image references
  // @Prop({ type: [Types.ObjectId], ref: 'Image' })
  // images: string[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
