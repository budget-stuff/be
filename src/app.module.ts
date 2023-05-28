import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';

@Module({
	imports: [
		RouterModule.register([
			{
				path: 'api',
				module: AppModule,
				children: [],
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
