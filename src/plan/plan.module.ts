import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanController } from './plan.controller.js';
import { Plan, PlanSchema } from './plan.schema.js';
import { PlanService } from './plan.service.js';

@Module({
	providers: [PlanService],
	exports: [PlanService, MongooseModule],
	imports: [
		MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
	],
	controllers: [PlanController],
})
export class PlanModule {}
