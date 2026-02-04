import { IsNumber, Min, Max, IsOptional, IsString } from "class-validator";

export class CreateReviewDTO {
    @IsNumber()
    transactionId: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;
}
