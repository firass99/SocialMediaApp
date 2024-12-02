import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from './config/refreshJwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import googleConfig from './config/google.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy, GoogleStrategy
    
  ],
  imports:[
    UserModule,
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),    
    ConfigModule.forFeature(googleConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    
  ]
})
export class AuthModule {}
