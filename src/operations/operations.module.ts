import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller.js';
import { OperationsService } from './operations.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './operations.schema.js';

@Module({
	controllers: [OperationsController],
	imports: [
		MongooseModule.forFeature([
			{ name: Operation.name, schema: OperationSchema },
		]),
	],
	providers: [OperationsService],
	exports: [OperationsService],
})
export class OperationsModule {}
