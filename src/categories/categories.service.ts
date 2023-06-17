import { Injectable, Logger } from '@nestjs/common';
import {
	Category,
	type CategoryData,
	type CategoryDocument,
} from './categories.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
	private readonly logger = new Logger(CategoriesService.name);
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>,
	) {}

	findById(_id: string, owner: string): Promise<CategoryData | null> {
		return this.categoryModel.findOne({ _id, owner });
	}

	getAllActive(owner: string): Promise<CategoryData[] | null | undefined> {
		return this.categoryModel.find({ owner, status: 'active' });
	}

	getAll(owner: string): Promise<CategoryData[] | null | undefined> {
		return this.categoryModel.find({ owner });
	}

	create(data: CategoryData, owner: string): Promise<CategoryDocument> {
		return this.categoryModel.create({ ...data, owner });
	}

	delete(_id: string, owner: string): Promise<CategoryData | undefined> {
		return this.categoryModel
			.findOneAndUpdate(
				{ _id, owner },
				{ status: 'archive' },
				{ new: true },
			)
			.then((val) => val?.toObject<CategoryData>());
	}

	update(
		data: CategoryData,
		_id: string,
		owner: string,
	): Promise<CategoryData | null> {
		return this.categoryModel.findOneAndUpdate({ _id, owner }, data, {
			new: true,
		});
	}
}
