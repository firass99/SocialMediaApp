import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private readonly postsService: PostService,
    private readonly usersService: UserService,

  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { userId, postId, content } = createCommentDto;
    const user = await this.usersService.findOne(userId); 
    const post = await this.postsService.findOne(postId); 


    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const newComment = this.commentsRepository.create({
        content, userId: user, postId: post 
      });

    return await this.commentsRepository.save(newComment);
}


  async findAll() {
    return await this.commentsRepository.find({ relations: ['userId', 'postId'] });
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['userId', 'postId'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id); // Ensure the comment exists

    // Update properties
    Object.assign(comment, updateCommentDto);

    return await this.commentsRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id); // Ensure the comment exists
    await this.commentsRepository.delete(comment.id);
    return { message: `Comment with ID ${id} has been removed` };
  }
}
