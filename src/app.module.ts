import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard.js';
import { CategoriesModule } from './categories/categories.module.js';
import { OperationsModule } from './operations/operations.module.js';
import { PlanModule } from './plan/plan.module.js';
import { UsersModule } from './users/users.module.js';
import autoPopulate from 'mongoose-autopopulate';

@Module({
	imports: [
		MongooseModule.forRoot(
			// в проде докер кинет в окружение имся хоста
			// это нужно для доступа БЕ к БД т.к у докера своя внутренняя сеть
			`mongodb://${env.DB_HOST ?? '127.0.0.1'}:27017/db`,
			{
				connectionFactory: (connection) => {
					connection.plugin(autoPopulate);

					return connection;
				},
			},
		),
		AuthModule,
		UsersModule,
		PlanModule,
		CategoriesModule,
		OperationsModule,
		RouterModule.register([
			{
				path: 'api',
				module: AppModule,
				children: [
					{
						path: 'auth',
						module: AuthModule,
					},
					{
						path: 'categories',
						module: CategoriesModule,
					},
					{
						path: 'plans',
						module: PlanModule,
					},
					{
						path: 'operations',
						module: OperationsModule,
					},
					{
						path: 'users',
						module: UsersModule,
					},
				],
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
