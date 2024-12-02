import { IsString, IsInt, isIn } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';

export class CreatePostDto {
    @ApiProperty({description: 'The title of the post', example: 'My first post'} )
    @IsString()
    readonly title: string;

    @ApiProperty({description: 'The content of the post', example: 'This is my first post description'} )
    @IsString()
    readonly content: string;
}

export class CreatePostResponseDto {
    @ApiProperty({
    description: 'The unique ID of the post',
    example: 1,
    })
    readonly id: number;

    @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
    })
    readonly title: string;

    @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post',
    })
    readonly content: string;

    @ApiProperty({
    description: 'The user who created the post',
    example: { id: 1, username: 'johndoe', email: 'johndoe@example.com' },
    type: () => User,
    })
    readonly userId: User;

    @ApiProperty({
    description: 'List of likes associated with the post',
    type: () => [Like],
    example: [{ id: 1, userId: 1, postId: 1 }],
    })
    readonly likes: Like[];

    @ApiProperty({
    description: 'List of comments associated with the post',
    type: () => [Comment],
    example: [
    { id: 1, content: 'Nice post!', userId: 2, postId: 1 },
    ],
    })
    readonly comments: Comment[];

    @ApiProperty({
    description: 'The date and time the post was created',
    example: '2024-11-04T12:34:56.000Z',
})
    readonly createdAt: Date;

    @ApiProperty({
    description: 'The date and time the post was last updated',
    example: '2024-11-04T15:34:56.000Z',
})
    readonly updatedAt: Date;
}
