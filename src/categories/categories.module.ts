import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller.js';
import { Category, CategorySchema } from './categories.schema.js';
import { CategoriesService } from './categories.service.js';

@Module({
	providers: [CategoriesService],
	exports: [CategoriesService],
	imports: [
		MongooseModule.forFeature([
			{ name: Category.name, schema: CategorySchema },
		]),
	],
	controllers: [CategoriesController],
})
export class CategoriesModule {}
