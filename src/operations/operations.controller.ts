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
import { OperationsService } from './operations.service.js';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard.js';
import type { FastifyRequest } from 'fastify';
import type { OperationData, OperationDocument } from './operations.schema.js';

@Controller()
export class OperationsController {
	private readonly logger = new Logger(OperationsController.name);

	constructor(private operationsService: OperationsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(
		@Req() req: FastifyRequest<{ Body: OperationData }>,
	): Promise<OperationDocument> {
		return this.operationsService
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
	): Promise<OperationData[] | null | undefined> {
		this.logger.log(new Date().toISOString());
		return this.operationsService.getAll(req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':_id')
	getById(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<OperationData | null | undefined> {
		return this.operationsService.findById(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':_id')
	delete(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest,
	): Promise<OperationDocument | null | undefined> {
		return this.operationsService.delete(_id, req.user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':_id')
	update(
		@Param('_id') _id: string,
		@Req() req: FastifyRequest<{ Body: OperationData }>,
	): Promise<OperationDocument | null> {
		return this.operationsService.update(req.body, _id, req.user._id);
	}
}
