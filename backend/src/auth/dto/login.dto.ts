import { IsString, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({ example: "user@example.com", description: "Felhasználó email címe" })
    @IsEmail({}, { message: "Please provide a valid email address" })
    email!: string;

    @ApiProperty({ example: "Password1!", description: "Felhasználó jelszava" })
    @IsString()
    @MinLength(1, { message: "Password is required" })
    password!: string;
}
