import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FollowService } from './follow/follow.service';
import { FollowController } from './follow/follow.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController,FollowController],
  providers: [    
    UserService, FollowService
  ],
  exports:[UserService,FollowService ]
})
export class UserModule {}
