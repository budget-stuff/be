import fastify from 'fastify';
import type { UserData } from './users/users.models';
declare module 'fastify' {
	export interface FastifyRequest {
		user: UserData;
	}
}
