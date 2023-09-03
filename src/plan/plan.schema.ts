import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, SchemaTypes } from 'mongoose';
import type { PlanCategiryData } from './plan.models.js';
import type { CategoryData } from '../categories/categories.schema.js';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class PlanCategory {
	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
		ref: 'Category',
	})
	category: CategoryData;

	@Prop({
		type: Number,
		required: true,
		default: 0,
	})
	expectedWaste: number;
}

const PlanCategorySchema = SchemaFactory.createForClass(PlanCategory);

@Schema()
export class Plan {
	@Prop({
		type: Number,
		required: true,
		default: new Date().getMonth(),
	})
	month: number;

	@Prop({
		type: Number,
		required: true,
		default: new Date().getFullYear(),
	})
	year: number;

	@Prop({
		type: [PlanCategorySchema],
		default: [],
	})
	categories: PlanCategiryData[];

	@Prop({
		type: SchemaTypes.ObjectId,
		required: true,
		ref: 'User',
	})
	owner: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
