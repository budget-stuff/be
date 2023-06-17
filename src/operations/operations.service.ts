import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import {
	Operation,
	type OperationDocument,
	type OperationData,
} from './operations.schema.js';

@Injectable()
export class OperationsService {
	private readonly logger = new Logger(OperationsService.name);
	constructor(
		@InjectModel(Operation.name)
		private readonly operationModel: Model<Operation>,
	) {}

	findById(_id: string, owner: string): Promise<OperationDocument | null> {
		return this.operationModel.findOne({ _id, owner });
	}

	getAll(owner: string): Promise<OperationDocument[] | null | undefined> {
		return this.operationModel.find({ owner });
	}

	create(data: OperationData, owner: string): Promise<OperationDocument> {
		return this.operationModel.create({ ...data, owner });
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
}
