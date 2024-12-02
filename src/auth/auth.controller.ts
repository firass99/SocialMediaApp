import { Controller, Post,  UseGuards, Request, HttpCode, HttpStatus, Put, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import {  RefreshJwtGuard } from './guards/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}


  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req){
    console.log(req)
    return await this.authService.login(req.user.id);    //req.user return from strategy 
    }


  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req){
    console.log("LOGOUT CONTROLLER........ ")
     //req.user return from strategy , delete from local storage and set refresh token to null
    return await this.userService.updateHashedRefreshToken(req.user.id, null);   
    }


  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refresh(@Request() req){
    console.log(req.id)
    return await this.authService.refreshToken(req.user.id);    //req.user return from strategy 
    }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(@Req() req) {
    console.log("GOOGLE LOGIN CONTROLLER");
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    console.log('GOOGLE CALLBACK CONTROLLER    $req');
      const response=await this.authService.login(req.user.id);
      //google user dont need refresh token they can login directly/Local and change password & dodo
      res.redirect(`http://localhost:5173?token=${response.accessToken}`);

    }
  }


  
























