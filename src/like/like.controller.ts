import { Controller, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  async likePost(@Param('postId') postId: string, @Req() req: any) {
    const user = req.user; // Extract user from JWT
    return await this.likeService.likePost(user.id, +postId);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  async unlikePost(@Param('postId') postId: string, @Req() req: any) {
    const user = req.user; // Extract user from JWT
    return await this.likeService.unlikePost(user.id, +postId);
  }
}
