import { IsEnum, IsOptional, IsString, IsNumber, Min, Max, IsInt } from "class-validator";
import { ListingType, TransactionStatus } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateListingDto {
  @ApiPropertyOptional({ example: "Weboldal fejlesztés", description: "Hirdetés címe" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Tapasztalt fejlesztőként vállalok React és Node.js projekteket.", description: "Hirdetés leírása" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ListingType, example: ListingType.OFFER, description: "Hirdetés típusa: OFFER vagy REQUEST" })
  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType;

  @ApiPropertyOptional({ example: "https://example.com/image.jpg", description: "Hirdetéshez tartozó kép URL-je" })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 10, description: "Óradíj (1–10 kredit)" })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  pricePerHour?: number;

  @ApiPropertyOptional({ example: 3, minimum: 1, maximum: 6, description: "Becsült munkaórák száma (1–6)" })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  estimatedHours?: number;

  @ApiPropertyOptional({ example: 1, description: "Kategória azonosítója" })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}
