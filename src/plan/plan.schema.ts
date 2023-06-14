import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
	@Prop({
		type: String,
		required: true,
		unique: true,
	})
	id: string;

	@Prop({
		type: String,
		required: true,
	})
	date: string;

	@Prop({
		type: String,
		required: true,
	})
	categoryId: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);

export interface PlanData {
	email: string;
}

@Schema()
export class PlanCategory {
	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
	})
	category: string;

	@Prop({
		type: String,
		required: true,
	})
	expected: string;
}

export interface PlanCategiriesData {
	categoryId: string;
}
