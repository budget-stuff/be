import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category, CategorySchema } from './categories.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
