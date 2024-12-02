import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateMessageDto {
    @IsInt()
    @IsNotEmpty()
    readonly postId: number;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsInt()
    @IsNotEmpty()
    readonly userId: User;


}
