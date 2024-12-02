import { Jwt } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully created'})
  create(@Body() createUserDto: CreateUserDto) {// email, username, bio, password
    return this.userService.register(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'list of users'})
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'The user has been successfully get profile'})
  getProfile(@Req() req) {
    console.log("REQ AFTER PASSING BY UseGuards ID FROM REQUEST*** ",req.user)
    console.log("REQ AFTER PASSING BY UseGuards ID FROM REQUESTWRONG*** ",req.id)

    return this.userService.findOne(+req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully delted'})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
