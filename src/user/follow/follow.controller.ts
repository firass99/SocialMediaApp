import { Controller, Post, Delete, Param, UseGuards, Req, Get } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('follow')
export class FollowController {
constructor(private readonly followService: FollowService) {}

@UseGuards(JwtAuthGuard)
@Post(':userId')
async follow(@Param('userId') userId: string, @Req() req) {
    const followerId = req.user.id; // Authenticated user's ID
    return this.followService.follow(followerId, +userId);
}

@UseGuards(JwtAuthGuard)
@Delete(':userId')
async unfollow(@Param('userId') userId: string, @Req() req) {
    const followerId = req.user.id; // Authenticated user's ID
    return this.followService.unfollow(followerId, +userId);
}

@Get(':userId/followers')
async getFollowers(@Param('userId') userId: string) {
    return this.followService.getFollowers(+userId);
}

@Get(':userId/following')
async getFollowing(@Param('userId') userId: string) {
    return this.followService.getFollowing(+userId);
}   
}
