import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {

@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column()
content: string;

// Relations
@ManyToOne(() => User, (User) => User.posts, { onDelete: 'CASCADE' })
userId: User;

@OneToMany(() => Like, (Like) => Like.post,{ nullable: true })
likes: Like[];

@OneToMany(() => Comment, (Comment) => Comment.postId,{ nullable: true })
comments: Comment[];


@CreateDateColumn()
createdAt: Date;
@UpdateDateColumn()
updatedAt: Date;
}
