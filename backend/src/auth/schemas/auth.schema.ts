import { User } from '@/modules/users/schemas/user.schema';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth extends OmitType(User, ['password']) {
  @IsMongoId({message: '_id sai dinh dang format'})
  _id: string
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
