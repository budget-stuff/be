import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, SchemaTypes } from 'mongoose';
import type { PlanCategiryData } from './plan.models.js';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class PlanCategory {
	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
		ref: 'Category',
		autopopulate: true,
	})
	category: string;

	@Prop({
		type: Number,
		required: true,
		default: 0,
	})
	expectedWaste: number;

	@Prop({
		type: Number,
		required: true,
		default: 0,
	})
	realWaste: number;
}

const PlanCategorySchema = SchemaFactory.createForClass(PlanCategory);

@Schema()
export class Plan {
	@Prop({
		type: String,
		required: true,
		default: new Date().getMonth(),
	})
	month: string;

	@Prop({
		type: String,
		required: true,
		default: new Date().getFullYear(),
	})
	year: string;

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
