import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	private readonly logger = new Logger(AppController.name);
	constructor(private appService: AppService) {}

	@Get()
	get(): string {
		return this.appService.getHello();
	}
}
