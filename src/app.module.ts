import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			// в проде докер кинет в окружение имся хоста
			// это нужно для доступа БЕ к БД т.к у докера своя внутренняя сеть
			`mongodb://${env.DB_HOST ?? '127.0.0.1'}:27017/db`,
		),
		AuthModule,
		UsersModule,
		RouterModule.register([
			{
				path: 'api',
				module: AppModule,
				children: [
					{
						path: 'auth',
						module: AuthModule,
					},
				],
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
