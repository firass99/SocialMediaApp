import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Message {
    
@PrimaryGeneratedColumn()
id: number;

@Column()
content: string;

@ManyToOne(() => User, (User) => User.messages, { onDelete: 'CASCADE' })
userId: User;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}