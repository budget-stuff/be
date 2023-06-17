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
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard.js';
import type { CategoryData, CategoryDocument } from './categories.schema.js';
import { CategoriesService } from './categories.service.js';

@Controller()
export class CategoriesController {
	private readonly logger = new Logger(CategoriesController.name);

	constructor(private categoriesService: CategoriesService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(
		@Req() req: FastifyRequest<{ Body: CategoryData }>,
	): Promise<CategoryDocument> {
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
	getAll(
		@Req() req: FastifyRequest,
	): Promise<CategoryData[] | null | undefined> {
		this.logger.log(req.user);
		return this.categoriesService.getAll(req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':_id')
	getById(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<CategoryData | null | undefined> {
		return this.categoriesService.findById(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':_id')
	delete(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<CategoryDocument | null | undefined> {
		return this.categoriesService.archive(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':_id')
	update(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest<{ Body: CategoryData }>,
	): Promise<CategoryDocument | null> {
		return this.categoriesService.update(req.body, _id, req.user._id);
	}
}
