import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'Local'){

    constructor(private authService:AuthService){
        super({
            usernameField:'email',
        });
    }

    async validate(email: string, password:string){
        if(password==="") throw new UnauthorizedException('Empty password!!');

        
        const userX = await this.authService.validateUser(email,password);//and will appended to request object req.id
        console.log("local startegy RETURNS ***** ",userX );
        console.log("local startegy RETURNS ID ***** ",userX.id );


        return userX;
    }

}