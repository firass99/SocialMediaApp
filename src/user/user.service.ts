import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Console } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {

    console.log("Attempting to register a user with DTO:", createUserDto);
    const userExist = await this.findByEmail(createUserDto.email);
    if (userExist) {
        throw new BadRequestException('User already exists');
    }

    // Create and save a new user
    console.log( "CREATING user cause NOT FOUND BY EMAIL")
    const newUser = this.usersRepository.create(createUserDto); 
    console.log("New user instance created:", newUser);

    return this.usersRepository.save(newUser); 
}


  async findAll() {
    return await this.usersRepository.find();
  }


  async findOne(id: number) {
    console.log("FINDING USER BY ID  :: ",id)

    const userX = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'role','email','hashedRefreshToken','posts','comments','likes'],
      relations: ['followers', 'following', 'posts', 'comments', 'likes'],
    }); 
    
    /*     const userX = await this.usersRepository
    .createQueryBuilder()
    .select(['user.id', 'user.email', 'user.username', 'user.role'])
    .from(User, 'user')
    .where('user.id = :id', { id })
    .printSql() // Add this line to log the SQL query
    .getOne();
    */
  
    return userX || (() => { throw new NotFoundException(`User with ID ${id} not found`); })();

    }
  
  

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id); // findOne 
    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    console.log("Removing user with ID:", id);
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return ('User deleted successfully $id');
  }


async findByEmail(email: string): Promise<User | null> {
  console.log(`Searching for user with email: ${email}`);
  const userX =await this.usersRepository.findOne({ where: { email } });
/*   const userX = await this.usersRepository
  .createQueryBuilder()
  .select("user")
  .from(User, "user")
  .where("user.email = :email", {email })
  .getOne() */
  console.log("FINDING USER BY EMAUL",userX)
  return userX;
}

  async updateHashedRefreshToken(userId:number, hashedRefreshToken:string) {
    console.log("SERVICE UPDATE REFRESH TOKEN SERVICE    _:");
    const usr=await this.usersRepository.findOne({where: {id:userId}});
    console.log("UPDATE REFRESH TOKEN SERVICE OF USER :  _",usr.id);
    
    usr.hashedRefreshToken=hashedRefreshToken;
    console.log("UPDATED REFRESH TOKEN OF USER :  _",usr.hashedRefreshToken);

    return await this.usersRepository.save(usr);
  }
  
}
