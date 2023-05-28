import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	private readonly logger = new Logger(GoogleStrategy.name);
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: 'https://budget-stuff.site/api/auth/redirect',
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		const { name, emails, photos } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		};
		done(null, user);
	}
}
