import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
@Injectable()
export class LikeService {


  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    private readonly UserService: UserService,
    private readonly PostService: PostService

  ) {}
  
  async create(createLikeDto: CreateLikeDto) {
    const{userId, postId}=createLikeDto;
    const usr=await this.UserService.findOne(userId);
    const pst=await this.PostService.findOne(postId);

    const newLike = this.likesRepository.create({ user: usr, post: pst });
    
    return this.likesRepository.save(newLike);
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  async remove(id: number) {
    const like = await this.likesRepository.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }
    
    await this.likesRepository.remove(like);
    return { message: `Like with ID ${id} has been removed` };
  }
}
