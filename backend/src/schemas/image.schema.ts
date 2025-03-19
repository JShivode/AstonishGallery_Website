// src/schemas/image.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  // This references the album to which the image belongs
  @Prop({ type: Types.ObjectId, ref: 'Album', required: true })
  albumId: string;

  @Prop({ required: true })
  imageUrl: string;

  // You can store additional info such as a title or description
  // @Prop()
  // title: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
