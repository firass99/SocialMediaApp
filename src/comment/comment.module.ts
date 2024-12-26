import { PostModule } from './../post/post.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Post])
  
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService], 
})
export class CommentModule {}
