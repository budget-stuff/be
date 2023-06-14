import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

const bootstrap = (): Promise<NestFastifyApplication> => {
	return NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	).then((app) => {
		app.register(fastifyCookie);

		// хак для работы гугл авторизации из nest/google с fastify (у ответа fastify нет метода setHeader)
		app.getHttpAdapter()
			.getInstance()
			.addHook('onRequest', (request, reply, done) => {
				reply.setHeader = function (key, value) {
					return this.raw.setHeader(key, value);
				};
				reply.end = function () {
					this.raw.end();
				};
				request.res = reply;
				done();
			});

		return app;
	});
};
export const viteNodeApp = bootstrap();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.env.PROD) {
	viteNodeApp.then((app) => {
		app.listen(3000, '0.0.0.0');
	});
}
