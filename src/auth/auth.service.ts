import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserData } from 'src/users/users.models.js';
import { UsersService } from '../users/users.service.js';
import type { LoginData } from './models/login-data.js';
import type { UserDocument } from 'src/users/users.schema.js';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	login(user: UserData | undefined): Promise<LoginData> {
		if (!user) {
			throw new BadRequestException('Unauthenticated');
		}

		return this.usersService
			.findByEmail(user.email)
			.then((registeredUser: UserDocument | null) => {
				if (registeredUser) {
					const payload = {
						email: registeredUser.email,
						_id: registeredUser._id,
					};

					return {
						accessToken: this.jwtService.sign(payload),
						user: payload,
					} as LoginData;
				}

				return this.registerUser(user);
			});
	}

	registerUser(user: UserData): Promise<LoginData> {
		return this.usersService.create(user).then((createdUser) => {
			const payload = {
				email: createdUser.email,
				_id: (createdUser as UserData)._id,
			};
			return {
				accessToken: this.jwtService.sign(payload),
				user: payload,
			};
		});
	}
}
