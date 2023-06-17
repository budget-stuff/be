import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({
		type: String,
		required: true,
		unique: true,
		minlength: 2,
		maxlength: 30,
	})
	email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
