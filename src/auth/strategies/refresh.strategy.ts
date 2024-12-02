import { AuthService } from './../auth.service';
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth.jwtPayload";
import { Inject } from "@nestjs/common";
import { Request } from "express";
import refreshJwtConfig from '../config/refreshJwt.config';

                                                 //cause  we have 2 jwt strategy we rename the strategy
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'RefreshJwt'){
    constructor(
        @Inject(refreshJwtConfig.KEY) 
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig> ,
        private authService:AuthService
    ){
        super({                         
            //fromBodyfield("refresh") and add a field in tha body
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret,
            ignoreExpiration:false,
            //to enable the validate function to access the request object
            passReqToCallback:true
            
        });
    }
    
    //if refresh token not expired we pass to validate()
    async validate(req:Request, payload: AuthJwtPayload){
        console.log('this is refresh jwt strategy');
        console.log(req.get("authorization"));
        const refreshToKen=await req.get("authorization").replace("Bearer","").trim();
        const userId=payload.id;
        const user=await this.authService.validateRefreshToken(userId,refreshToKen);
        return user;
        //this return req.user
    }


    
}