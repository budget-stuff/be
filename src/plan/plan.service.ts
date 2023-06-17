import { Injectable, Logger } from '@nestjs/common';
import { Plan, type PlanDocument } from './plan.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { PlanData } from './plan.models.js';

@Injectable()
export class PlanService {
	private readonly logger = new Logger(PlanService.name);
	constructor(
		@InjectModel(Plan.name)
		private readonly planModel: Model<Plan>,
	) {}

	findById(_id: string, owner: string): Promise<PlanDocument | null> {
		return this.planModel.findOne({ _id, owner });
	}

	getAll(owner: string): Promise<PlanDocument[] | null | undefined> {
		return this.planModel.find({ owner });
	}

	create(data: PlanData, owner: string): Promise<PlanDocument> {
		return this.planModel.create({ ...data, owner });
	}

	delete(_id: string, owner: string): Promise<PlanDocument | undefined> {
		return this.planModel.findOneAndDelete({ _id, owner }, { new: true });
	}

	update(
		data: PlanData,
		_id: string,
		owner: string,
	): Promise<PlanDocument | null> {
		return this.planModel.findOneAndUpdate({ _id, owner }, data, {
			new: true,
		});
	}
}
