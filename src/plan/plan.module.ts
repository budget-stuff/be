import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan, PlanSchema } from './plan.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	providers: [PlanService],
	exports: [PlanService],
	imports: [
		MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
	],
	controllers: [PlanController],
})
export class PlanModule {}
