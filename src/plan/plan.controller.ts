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
import type { PlanDocument } from './plan.schema.js';
import { PlanService } from './plan.service.js';
import type { PlanData } from './plan.models.js';

@Controller()
export class PlanController {
	private readonly logger = new Logger(PlanController.name);

	constructor(private planService: PlanService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Req() req: FastifyRequest<{ Body: PlanData }>): Promise<PlanData> {
		return this.planService.create(req.body, req.user?._id).catch((err) => {
			throw new HttpException(err.message, 400, {
				cause: new Error(err.name),
			});
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAll(@Req() req: FastifyRequest): Promise<PlanData[] | null | undefined> {
		return this.planService.getAll(req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':_id')
	getById(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<PlanData | null | undefined> {
		return this.planService.findById(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':_id')
	delete(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<PlanData | null | undefined> {
		return this.planService.delete(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':_id')
	update(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest<{ Body: PlanData }>,
	): Promise<PlanDocument | null> {
		return this.planService.update(req.body, _id, req.user._id);
	}
}
