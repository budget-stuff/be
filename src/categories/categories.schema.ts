import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

import type { UserData } from '../users/users.models';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
	@Prop({
		type: String,
		required: [true, 'name field is required'],
		minlength: 2,
		maxlength: 30,
	})
	name: string;

	@Prop({
		type: String,
		default: 'outcome',
	})
	type: 'income' | 'outcome' | 'acc';

	@Prop({
		type: String,
		default: 'active',
	})
	status: 'active' | 'archive';

	@Prop({
		type: SchemaTypes.ObjectId,
		required: true,
		ref: 'User',
	})
	owner: UserData;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export interface CategoryData {
	name: string;
	_id?: string;
	type?: 'income' | 'outcome' | 'acc';
	status?: 'active' | 'archive';
	owner?: UserData;
}
