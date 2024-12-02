import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Like {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (User) => User.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, (Post) => Post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

}
