import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, SchemaTypes } from 'mongoose';

import type { UserData } from '../users/users.models.js';
import type { CategoryData } from 'src/categories/categories.schema.js';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {
	@Prop({
		type: String,
		minlength: 0,
		maxlength: [30, 'не пиши оду, просто пару слов'],
		default: null,
	})
	comment: string;

	@Prop({
		type: String,
		default: 'outcome',
	})
	type: 'income' | 'outcome';

	@Prop({
		type: Number,
		required: [true, 'ты гонишь чтоли, у операции должна быть сумма'],
	})
	amount: number;

	@Prop({
		type: String,
		default: new Date().toISOString(),
	})
	date: string;

	@Prop({
		type: SchemaTypes.ObjectId,
		required: true,
		ref: 'Category',
		autopopulate: true,
	})
	category: CategoryData;

	@Prop({
		type: SchemaTypes.ObjectId,
		required: true,
		ref: 'User',
		autopopulate: true,
	})
	owner: UserData;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);

export interface OperationData {
	comment?: string;
	type?: 'income' | 'outcome';
	amount: number;
	date?: string;
	owner?: UserData;
	category: CategoryData;
}
