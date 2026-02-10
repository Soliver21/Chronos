import { IsEnum, IsOptional, IsString, IsNumber, Min, Max, IsInt } from "class-validator";
import { ListingType } from "@prisma/client";

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  categoryId: number;

  @IsEnum(ListingType)
  type: ListingType;

  @IsNumber()
  @Min(1)
  @Max(10)
  pricePerHour: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  estimatedHours?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
