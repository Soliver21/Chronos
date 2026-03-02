import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateWebsiteReviewDTO {
    @ApiProperty({ description: "Rating from 1 to 5", minimum: 1, maximum: 5, example: 5 })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiPropertyOptional({ description: "Optional comment about the platform", example: "Great platform!" })
    @IsOptional()
    @IsString()
    comment?: string;
}
