import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/api/users/model/users.model';

export type authDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  password: string;

  @Prop([String])
  sessions: string[];
}

export const authSchema = SchemaFactory.createForClass(Auth);
