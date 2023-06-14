import { Injectable } from '@nestjs/common';
import { Category, CategoryData } from './categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>,
	) {}

	findById(id: string, owner: string): Promise<CategoryData | null> {
		return this.categoryModel.findOne({ id, owner });
	}

	getAllActive(owner: string): Promise<CategoryData[] | null | undefined> {
		return this.categoryModel.find({ owner, status: 'active' });
	}

	getAll(owner: string): Promise<CategoryData[] | null | undefined> {
		return this.categoryModel.find({ owner });
	}

	create(data: CategoryData, owner: string): Promise<CategoryData> {
		return this.categoryModel.create({ ...data, owner });
	}

	delete(id: string, owner: string): Promise<CategoryData | undefined> {
		return this.categoryModel
			.findOneAndUpdate(
				{ id, owner },
				{ status: 'archive' },
				{ new: true },
			)
			.then((val) => val?.toObject<CategoryData>());
	}

	update(
		data: CategoryData,
		id: string,
		owner: string,
	): Promise<CategoryData | null> {
		return this.categoryModel.findOneAndUpdate({ id, owner }, data, {
			new: true,
		});
	}
}
