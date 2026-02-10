import { IsString, IsEmail, MinLength, Matches } from "class-validator";

export class RegisterUserDto {
    @IsEmail({}, { message: "Please provide a valid email address" })
    email!: string;

    @IsString()
    @MinLength(2, { message: "Name must be at least 2 characters long" })
    name!: string;

    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message: "Password must contain at least one uppercase letter and one special character",
    })
    password!: string;
}