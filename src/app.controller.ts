import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
	private readonly logger = new Logger(AppController.name);
	constructor(private appService: AppService) {}

	@Get('hello')
	get(): string {
		return this.appService.getHello();
	}
}
