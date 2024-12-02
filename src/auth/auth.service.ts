import { CreateUserDto } from './../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/currentuser';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import refresh_jwtConfig from './config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';
import refreshJwtConfig from './config/refreshJwt.config';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UserService,
        private jwtService:JwtService,
        @Inject(refresh_jwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
    ) {}

    async generateToken(user: any){
        const payload:AuthJwtPayload={
            id:user.id,
            username:user.username,
            email:user.email,
            role:user.role
        };
        const [accessToken, refreshToken]=await Promise.all([
            this.jwtService.sign(payload),
            this.jwtService.sign(payload,this.refreshTokenConfig)
        ])
        return {
            accessToken,
            refreshToken
        }}
        


    async login(userId: number) {
        console.log("LOGIN SERVICEEEEE    :_ ");
        const user = await this.usersService.findOne(userId);
        console.log("LOGIN SERVICEEEEE*** generate token    :_ ");

        const {accessToken, refreshToken}= await this.generateToken(user);

        const hashedRefreshToken =await argon2.hash(refreshToken);
        console.log("LOGIN SERVICEEEEE*** update hashed refresh token   :_ ");

        await this.usersService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            userId,
            accessToken,
            refreshToken
                }
            };



    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        console.log('VALID USER SERVICEE   :_');
        if (!user) {
            throw new UnauthorizedException("User Email not found");
        }
        if (!user.password) {
            //console.log('VALID USER PWWWWD :',user.password)
            throw new UnauthorizedException("Invalid pwd credentials");
        }
    
        const validPassword = compare(password, user.password);
        if (!validPassword) {
            //console.log('VALID USER COMPAREEE :',user.password)
            throw new UnauthorizedException("Invalid credentials");
        }
    
        return user;
    }

    async validateGoogleUser(oAuthUserDto: CreateUserDto) {
        console.log("*See if google user exists     _:")
        const user = await this.usersService.findByEmail(oAuthUserDto.email);
        if (user) {
            console.log("*GOOGLE USER EXISTS     _:")
            return user;
        }
        // REGISTER Then Call The Call Back Function
        const newUser = await this.usersService.register(oAuthUserDto);
        console.log("*Registered new google user cause NEW     _:")
        return newUser;
    }
    
    

    async validateJwtUser(userId: number) {
        console.log('Validating JWT UserSERVICE    _:', userId);
    
        const user = await this.usersService.findOne(userId);
        if (!user) throw new UnauthorizedException('User not found!');
    
        const currentUser: CurrentUser = { 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
        };
        console.log('Validated User:', currentUser);
        return currentUser;
    }
    


    
    //used in the strategy
    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
            //if user delted || logout
        if (!user || !user.hashedRefreshToken)
            throw new UnauthorizedException('Invalid Refresh Token1');
    
        const refreshTokenMatches = await argon2.verify(
            user.hashedRefreshToken,
            refreshToken
        );
        if (!refreshTokenMatches)
            throw new UnauthorizedException('Invalid Refresh Token2');
        console.log('Validated Refresh Token service of user    _:', user);
        return user;
    }



    /*used in refresh controller and 
    will generate 2 new tokens with the update of rfrshtoken like login*/
    async refreshToken(userId: number){
        const {accessToken, refreshToken}= await this.generateToken(userId);
        const hashedRefreshToken =await argon2.hash(refreshToken)
        
        await this.usersService.updateHashedRefreshToken(userId, hashedRefreshToken);

        console.log("REFRESHH TOKEN SERVICEEE     _:");
        return {
            userId,
            accessToken,
            refreshToken
        }
    }




}