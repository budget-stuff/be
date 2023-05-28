import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppController } from 'src/app.controller';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UserData } from 'src/users/users.schema';
import { env } from 'process';

@Controller()
export class AuthController {
	private readonly logger = new Logger(AppController.name);

	constructor(private authService: AuthService) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async googleAuth(@Req() req: any) {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(
		@Req() req: Request,
		@Res({ passthrough: false }) response: Response,
	) {
		return this.authService.login(req.user as UserData).then((data) => {
			response.cookie('jwt', data?.accessToken);

			if (req.hostname === 'localhost') {
				response.redirect('http://localhost:5173');
			} else {
				this.logger.log('address' + env.APP_ADDRESS);
				response.redirect(env.APP_ADDRESS || 'http://localhost:5173');
			}
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUser(@Req() req: any) {
		return req.user;
	}
}
