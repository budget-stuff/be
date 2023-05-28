import {
	Controller,
	Get,
	Logger,
	Req,
	Request,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppController } from 'src/app.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

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
		@Request() req: any,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.authService.login(req.user).then((data) => {
			response.cookie('jwt', data?.accessToken);

			return data.user;
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUser(@Request() req: any) {
		return req.user;
	}
}
