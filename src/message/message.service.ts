import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMsg = this.messagesRepository.create(createMessageDto);
    return await this.messagesRepository.save(newMsg);
  }

  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messagesRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async update(id: number, UpdateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);  
    return await this.messagesRepository.save({...message,...UpdateMessageDto});
  }

  async remove(id: number): Promise<void> {
    const result = await this.messagesRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`the meage with ID ${id} not found`);
    }
  }
}
