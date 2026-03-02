import { IsNumber, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty({ example: "42", description: "A hirdetés azonosítója (string)" })
  @IsString()
  listingId: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 6, description: "Megállapodott munkaórák száma (1–6)" })
  @IsNumber() @Min(1) @Max(6)
  agreedHours: number;
}
