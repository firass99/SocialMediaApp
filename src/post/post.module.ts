import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({  
  imports:[TypeOrmModule.forFeature([Post]),TypeOrmModule.forFeature([User])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService], 
})
export class PostModule {}
