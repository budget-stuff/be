import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller.js';
import { User, UserSchema } from './users.schema.js';
import { UsersService } from './users.service.js';

@Module({
	providers: [UsersService],
	exports: [UsersService],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
})
export class UsersModule {}
