import {
	Controller,
	Delete,
	Get,
	HttpException,
	Logger,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { CategoryData } from './categories.schema';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../../src/auth/jwt/jwt-auth.guard';

@Controller()
export class CategoriesController {
	private readonly logger = new Logger(CategoriesController.name);

	constructor(private categoriesService: CategoriesService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Req() req: any): Promise<CategoryData> {
		return this.categoriesService
			.create(req.body, req.user?._id)
			.catch((err) => {
				throw new HttpException(err.message, 400, {
					cause: new Error(err.name),
				});
			});
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAll(@Req() req: any): Promise<CategoryData[] | null | undefined> {
		this.logger.log(req.user);
		return this.categoriesService.getAll(req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	getById(
		@Param('id') id: string,
		@Req() req: any,
	): Promise<CategoryData | null | undefined> {
		return this.categoriesService.findById(id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	delete(
		@Param('id') id: string,
		@Req() req: any,
	): Promise<CategoryData | null | undefined> {
		return this.categoriesService.delete(id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(
		@Param('id') id: string,
		@Req() req: any,
	): Promise<CategoryData | null> {
		return this.categoriesService.update(req.body, id, req.user._id);
	}
}
