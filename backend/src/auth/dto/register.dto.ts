import { IsString, IsEmail, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty({ example: "user@example.com", description: "Felhasználó email címe" })
    @IsEmail({}, { message: "Please provide a valid email address" })
    email!: string;

    @ApiProperty({ example: "Kovács János", description: "Felhasználó neve (min. 2 karakter)" })
    @IsString()
    @MinLength(2, { message: "Name must be at least 2 characters long" })
    name!: string;

    @ApiProperty({ example: "Password1!", description: "Jelszó (min. 8 karakter, legalább egy nagybetű és egy speciális karakter)" })
    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message: "Password must contain at least one uppercase letter and one special character",
    })
    password!: string;
}
