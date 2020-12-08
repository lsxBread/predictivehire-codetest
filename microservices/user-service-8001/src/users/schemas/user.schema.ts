import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type Role = 'user' | 'admin';

@Schema()
export class User {
  @Prop()
  companyId: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
