import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller.js';
import { OperationsService } from './operations.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './operations.schema.js';
import { PlanModule } from '../plan/plan.module.js';

@Module({
	imports: [
		PlanModule,
		MongooseModule.forFeature([
			{ name: Operation.name, schema: OperationSchema },
		]),
		
	],
	providers: [OperationsService],
	exports: [OperationsService],
	controllers: [OperationsController],
})
export class OperationsModule {}
