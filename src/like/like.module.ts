import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';

@Module({  
  imports:[TypeOrmModule.forFeature([Like]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Post])


  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports:[LikeService]

})
export class LikeModule {}
