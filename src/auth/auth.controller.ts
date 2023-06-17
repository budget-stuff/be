import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { env } from 'process';
import type { UserData } from 'src/users/users.models.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt/jwt-auth.guard.js';

@Controller()
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private authService: AuthService) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async googleAuth() {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(
		@Req() req: FastifyRequest,
		@Res({ passthrough: false }) response: FastifyReply,
	) {
		// юзер оказывается в запросе после гугл авторизации (см. google.strategy.ts)
		const userData = (req as any).user as UserData;

		return this.authService.login(userData).then((data) => {
			response.cookie('jwt', data?.accessToken);

			response
				.status(302)
				.redirect(env.APP_ADDRESS || 'http://localhost:5173');
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUser(@Req() req: any) {
		return req.user;
	}
}
