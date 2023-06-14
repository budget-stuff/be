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
import { User } from './users.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../src/auth/jwt/jwt-auth.guard';
import type { UserData } from './users.models';

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
	getUser(@Param('email') email: string): Promise<User | null | undefined> {
		return this.usersService.findByEmail(email);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':email')
	deleteUser(
		@Param('email') email: string,
	): Promise<User | null | undefined> {
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
