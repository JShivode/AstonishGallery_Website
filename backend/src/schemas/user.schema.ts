// src/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  // You can add more fields as needed, for example:
  // @Prop()
  // username: string;

  // @Prop()
  // password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
