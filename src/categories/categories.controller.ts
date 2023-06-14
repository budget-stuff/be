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
import type { FastifyRequest } from 'fastify';

@Controller()
export class CategoriesController {
	private readonly logger = new Logger(CategoriesController.name);

	constructor(private categoriesService: CategoriesService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(
		@Req() req: FastifyRequest<{ Body: CategoryData }>,
	): Promise<CategoryData> {
		return this.categoriesService
			.create(req.body, req.user?.id)
			.catch((err) => {
				throw new HttpException(err.message, 400, {
					cause: new Error(err.name),
				});
			});
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAll(
		@Req() req: FastifyRequest,
	): Promise<CategoryData[] | null | undefined> {
		this.logger.log(req.user);
		return this.categoriesService.getAll(req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	getById(
		@Param('id') id: string,
		@Req() req: FastifyRequest,
	): Promise<CategoryData | null | undefined> {
		return this.categoriesService.findById(id, req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	delete(
		@Param('id') id: string,
		@Req() req: FastifyRequest,
	): Promise<CategoryData | null | undefined> {
		return this.categoriesService.delete(id, req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(
		@Param('id') id: string,
		@Req() req: FastifyRequest<{ Body: CategoryData }>,
	): Promise<CategoryData | null> {
		return this.categoriesService.update(req.body, id, req.user.id);
	}
}
