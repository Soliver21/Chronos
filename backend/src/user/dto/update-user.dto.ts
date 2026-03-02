import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDTO {
    @ApiPropertyOptional({ example: "Kovács János", description: "Felhasználó neve" })
    @IsOptional() @IsString()
    name?: string;

    @ApiPropertyOptional({ example: "user@example.com", description: "Felhasználó email címe" })
    @IsEmail() @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: "Tapasztalt fejlesztő vagyok.", description: "Felhasználó bemutatkozó szövege" })
    @IsOptional() @IsString()
    bio?: string;

    @ApiPropertyOptional({ example: "/uploads/avatar.jpg", description: "Avatar kép elérési útja" })
    @IsOptional() @IsString()
    avatar?: string;
}
