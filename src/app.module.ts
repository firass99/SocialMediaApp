import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import dbConfigProduction from './config/db.config.production';
import dbConfig from './config/dbConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ 
      useFactory:process.env.NODE_ENV==="production"? dbConfigProduction:dbConfig
    }),
    ConfigModule.forRoot({      
      envFilePath: '.env',
      isGlobal:true,
      expandVariables:true,
      load:[dbConfig], //load config file
    }),
    UserModule,
    CommentModule,
    PostModule,
    LikeModule,
    MessageModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
