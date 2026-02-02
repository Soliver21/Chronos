import { IsNumber, IsString, Max, Min } from "class-validator";


export class CreateTransactionDto {
  @IsString()
  listingId: string;

  @IsNumber() @Min(1) @Max(6)
  agreedHours: number;
}