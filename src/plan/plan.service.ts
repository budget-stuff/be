import { Injectable, Logger } from '@nestjs/common';
import { Plan, PlanData } from './plan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlanService {
	private readonly logger = new Logger(PlanService.name);
	constructor(
		@InjectModel(Plan.name)
		private readonly planModel: Model<Plan>,
	) {}

	findById(_id: string, owner: string): Promise<PlanData | null> {
		return this.planModel.findOne({ _id, owner });
	}

	getAll(owner: string): Promise<PlanData[] | null | undefined> {
		return this.planModel.find({ owner });
	}

	create(data: PlanData, owner: string): Promise<PlanData> {
		return this.planModel.create({ ...data, owner });
	}

	delete(_id: string, owner: string): Promise<PlanData | undefined> {
		return this.planModel
			.findByIdAndDelete({ _id, owner }, { new: true })
			.then((val) => val?.toObject<PlanData>());
	}

	update(
		data: PlanData,
		_id: string,
		owner: string,
	): Promise<PlanData | null> {
		return this.planModel.findOneAndUpdate({ _id, owner }, data, {
			new: true,
		});
	}
}
