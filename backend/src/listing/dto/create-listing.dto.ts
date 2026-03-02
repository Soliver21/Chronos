import { IsEnum, IsOptional, IsString, IsNumber, Min, Max, IsInt } from "class-validator";
import { ListingType } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateListingDto {
  @ApiProperty({ example: "Weboldal fejlesztés", description: "Hirdetés címe" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Tapasztalt fejlesztőként vállalok React és Node.js projekteket.", description: "Hirdetés leírása" })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: "Kategória azonosítója" })
  @IsInt()
  categoryId: number;

  @ApiProperty({ enum: ListingType, example: ListingType.OFFER, description: "Hirdetés típusa: OFFER (kínálat) vagy REQUEST (kereslet)" })
  @IsEnum(ListingType)
  type: ListingType;

  @ApiProperty({ example: 5, minimum: 1, maximum: 10, description: "Óradíj (1–10 kredit)" })
  @IsNumber()
  @Min(1)
  @Max(10)
  pricePerHour: number;

  @ApiPropertyOptional({ example: 3, minimum: 1, maximum: 6, description: "Becsült munkaórák száma (1–6)" })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  estimatedHours?: number;

  @ApiPropertyOptional({ example: "https://example.com/image.jpg", description: "Hirdetéshez tartozó kép URL-je" })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
