import {IsEmail, IsOptional, IsString} from "class-validator";
export class UpdateUserDTO {
    @IsOptional() @IsString()
    name?: string;

    @IsEmail() @IsOptional() 
    email?: string;

    @IsOptional() @IsString()
    bio?: string;

    @IsOptional() @IsString()
    avatar?: string;

}