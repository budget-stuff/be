import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	Category,
	type CategoryData,
	type CategoryDocument,
} from './categories.schema.js';

@Injectable()
export class CategoriesService {
	private readonly logger = new Logger(CategoriesService.name);
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>,
	) { }
	
	getReallyAll(): Promise<CategoryData[] | null | undefined> {
		return this.categoryModel.find({});
	}

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

	archive(_id: string, owner: string): Promise<CategoryDocument | undefined> {
		return this.categoryModel.findOneAndUpdate(
			{ _id, owner },
			{ status: 'archive' },
			{ new: true },
		);
	}

	update(
		data: CategoryData,
		_id: string,
		owner: string,
	): Promise<CategoryDocument | null> {
		return this.categoryModel.findOneAndUpdate({ _id, owner }, data, {
			new: true,
		});
	}
}
