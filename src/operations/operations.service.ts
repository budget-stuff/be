import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import {
	Operation,
	type OperationDocument,
	type OperationData,
} from './operations.schema.js';
import type { PlanService } from '../plan/plan.service.js';
import { Plan, type PlanDocument } from '../plan/plan.schema.js';

@Injectable()
export class OperationsService {
	private readonly logger = new Logger(OperationsService.name);
	constructor(
		@InjectModel(Operation.name) private readonly operationModel: Model<Operation>,
		@InjectModel(Plan.name) private readonly planModel: Model<Plan>
	) {}

	findById(_id: string, owner: string): Promise<OperationDocument | null> {
		return this.operationModel.findOne({ _id, owner });
	}

	getAll(owner: string): Promise<OperationDocument[] | null | undefined> {
		return this.operationModel.find({ owner });
	}

	create(data: OperationData, owner: string): Promise<OperationDocument> {
		return this.operationModel.create({ ...data, owner }).then(createdOperation => {
			return this.updatePlanWaste(createdOperation.toObject(), owner, true)
				.then(() => createdOperation);
		})
	}

	delete(_id: string, owner: string): Promise<OperationDocument | undefined> {
		return this.operationModel.findOneAndDelete(
			{ _id, owner },
			{ new: true },
		);
	}

	update(
		data: OperationData,
		_id: string,
		owner: string,
	): Promise<OperationDocument | null> {
		return this.operationModel.findOneAndUpdate({ _id, owner }, data, {
			new: true,
		});
	}

	private updatePlanWaste(operation: OperationData, owner: string, isAdding: boolean): Promise<PlanDocument | null> {
		const operationDate = new Date(operation.date);

		const month = operationDate.getMonth();
		const year = operationDate.getFullYear();

		return this.planModel.findOne({ month, year, owner }).then(plan => {

			let updateData = plan.toObject();

			updateData.categories = updateData.categories.map(planCategory => {
				// дополнительно приводим к строке потому что ебучие ObjectId ведут себя всрато, так надежднее
				if (String(planCategory.category._id) === String(operation.category._id)) {
					this.logger.log('айдишники совпали неужели')
					return {
						...planCategory,
						realWaste: isAdding ? planCategory.realWaste + operation.amount : planCategory.realWaste - operation.amount
					}
				}

				return planCategory;
			})

			return this.planModel.findOneAndUpdate({ _id: plan._id, owner }, updateData, {
				new: true,
			});
		})
	}
}
