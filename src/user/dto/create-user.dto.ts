import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'The email of the user'})
    readonly email: string;
    
    @IsString()  
    @IsNotEmpty()    
    @ApiProperty({description: 'The email of the user'})
    readonly username: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The email of the user'})
    readonly bio: string;
    
    @IsString()  
    @IsNotEmpty()
    @ApiProperty({description: 'The email of the user'})
    readonly password: string;
    


}
