import {
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Put,
	Request,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard.js';
import type { UserData } from './users.models.js';
import type { UserDocument } from './users.schema.js';
import { UsersService } from './users.service.js';

@Controller()
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAllUsers(): Promise<UserData[] | null | undefined> {
		return this.usersService.getAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':email')
	getUser(
		@Param('email') email: string,
	): Promise<UserDocument | null | undefined> {
		return this.usersService.findByEmail(email);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':email')
	deleteUser(
		@Param('email') email: string,
	): Promise<UserDocument | null | undefined> {
		return this.usersService.delete(email);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	updateUser(
		@Param('id') id: string,
		@Request() req: any,
	): Promise<UserData | null> {
		return this.usersService.update(req.body, id);
	}
}
