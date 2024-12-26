import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from '../auth/types/currentuser';
import { AuthJwtPayload } from '../auth/types/auth.jwtPayload';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, user: any) {
    const author = await this.usersRepository.findOne({ where: { id: user.id } });
    if (!author) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    const newPost = this.postsRepository.create({
      ...createPostDto,
      userId: author, // Associate the post with the authenticated user
    });

    return await this.postsRepository.save(newPost);
  }

  async findAll() {
    return await this.postsRepository.find({ relations: ['likes', 'comments', 'userId'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['likes', 'comments', 'userId'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return await this.postsRepository.save({ ...post, ...updatePostDto });
  }

  async remove(id: number) {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return result;
  }
}
