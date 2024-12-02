import { VerifyCallback } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";
import googleConfig from '../config/google.config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'Google') {
    constructor(
        @Inject(googleConfig.KEY)
        googleConfiguration: ConfigType<typeof googleConfig>,
        private authService: AuthService,
    ) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        const profileDTO = { 
            email: profile.emails?.[0]?.value, // Use optional chaining for safety
            username: profile.name?.givenName+' '+profile.name?.familyName,
            bio: null,
            password: "", // Placeholder since Google OAuth users don’t have a password
        };


        const user = await this.authService.validateGoogleUser(profileDTO );
        console.log("USER FROM GOOGLE STRATEGY   _: ",user)
        done(null, user); // Return the user for the callback URL after register to login
    }
}
