import { PostModule } from './../post/post.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),
  UserModule,
  PostModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService], 
})
export class CommentModule {}
