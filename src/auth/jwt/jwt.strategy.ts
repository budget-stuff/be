import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(JwtStrategy.name);
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	private static extractJWT(req: RequestType): string | null {
		if (req.cookies && 'jwt' in req.cookies && req.cookies.jwt.length > 0) {
			return req.cookies.jwt;
		}
		return null;
	}

	async validate(payload: any) {
		return { ...payload };
	}
}
