import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../constant/Role.enum";
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';
import { Message } from '../../message/entities/message.entity';
const bcrypt = require('bcrypt');

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column({ unique: true })
email: string;

@Column()
username: string;

@Column()
password: string;

@Column({ nullable: true })
bio: string;

@Column({ type: 'enum', enum: Role, default: Role.USER })
role: Role;

@Column({ nullable: true })
hashedRefreshToken: string;

// Relations
@ManyToMany(() => User, (user) => user.following, { nullable: true })
@JoinTable()
followers: User[];

@ManyToMany(() => User, (user) => user.followers, { nullable: true })
following: User[];

@OneToMany(() => Message, (message) => message.userId, { nullable: true })
messages: Message[];

@OneToMany(() => Like, (like) => like.user, { nullable: true })
likes: Like[];

@OneToMany(() => Post, (post) => post.userId, { nullable: true })
posts: Post[];

@OneToMany(() => Comment, (comment) => comment.userId, { nullable: true })
comments: Comment[];

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@BeforeInsert()
@BeforeUpdate()
async hashPassword() {
this.password = await bcrypt.hash(this.password, 10);
}
}
