import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '../users/users.models';
import { UsersService } from '../users/users.service';
import { LoginData } from './models/login-data';

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
			.then((registeredUser: UserData | null) => {
				if (registeredUser) {
					const payload = {
						email: registeredUser.email,
						id: registeredUser.id,
					};

					return {
						accessToken: this.jwtService.sign(payload),
						user: payload,
					};
				}

				return this.registerUser(user);
			});
	}

	registerUser(user: UserData): Promise<LoginData> {
		return this.usersService.create(user).then((createdUser) => {
			const payload = {
				email: createdUser.email,
				id: (createdUser as UserData).id,
			};
			return {
				accessToken: this.jwtService.sign(payload),
				user: payload,
			};
		});
	}
}
