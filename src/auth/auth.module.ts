import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '7d' },
		}),
	],
	providers: [AuthService, GoogleStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
