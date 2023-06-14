import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { UsersModule } from './users/users.module';
import { OperationsModule } from './operations/operations.module';
import { CategoriesModule } from './categories/categories.module';
import { PlanModule } from './plan/plan.module';
import autoPopulate from 'mongoose-autopopulate';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

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
				],
			},
		]),
		OperationsModule,
		CategoriesModule,
		PlanModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
