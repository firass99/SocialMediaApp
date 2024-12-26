import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const { postId, content } = createCommentDto;
  
    // Find the user
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // Find the post
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  
    // Create and save the comment
    const newComment = this.commentsRepository.create({
      content,
      userId: user,
      postId: post,
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

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.findOne(id);

    // Ensure the comment belongs to the authenticated user
    if (comment.userId.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this comment');
    }

    Object.assign(comment, updateCommentDto);
    return await this.commentsRepository.save(comment);
  }

  async remove(id: number, userId: number) {
    const comment = await this.findOne(id);

    // Ensure the comment belongs to the authenticated user
    if (comment.userId.id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this comment');
    }

    await this.commentsRepository.delete(id);
    return { message: `Comment with ID ${id} has been removed` };
  }
}
