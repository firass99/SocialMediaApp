import { User } from './../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';


@Entity()
export class Comment {

@PrimaryGeneratedColumn()
id: number;

@Column()
content: string;

@ManyToOne(() => User, (User) => User.comments, { onDelete: 'CASCADE' })
userId: User;

@ManyToOne(() => Post, (Post) => Post.comments, { onDelete: 'CASCADE' })
postId: Post;

@CreateDateColumn()
createdAt: Date;
@UpdateDateColumn()
updatedAt: Date;
}
