import { IsNumber, Min, Max, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReviewDTO {
    @ApiProperty({ example: 7, description: "A lezárt tranzakció azonosítója" })
    @IsNumber()
    transactionId: number;

    @ApiProperty({ example: 4, minimum: 1, maximum: 5, description: "Értékelés (1–5)" })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiPropertyOptional({ example: "Kiváló munkát végzett, időre elkészült.", description: "Szöveges vélemény (opcionális)" })
    @IsOptional()
    @IsString()
    comment?: string;
}
