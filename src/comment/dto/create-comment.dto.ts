import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsInt()
    @IsNotEmpty()
    postId: number;

    @IsInt()    
    @IsNotEmpty()
    userId: number;

    @IsString()    
    @IsNotEmpty()
    content: string;
}
