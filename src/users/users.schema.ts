import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({
		required: true,
		unique: true,
		minlength: 2,
		maxlength: 30,
	})
	email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserData {
	email: string;
}