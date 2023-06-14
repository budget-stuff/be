import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

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

	@Prop({
		unique: true,
		type: SchemaTypes.ObjectId,
		auto: true,
	})
	id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
