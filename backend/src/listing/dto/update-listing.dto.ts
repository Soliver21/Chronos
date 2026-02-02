import { IsEnum, IsOptional, IsString, IsNumber, Min, Max, IsInt } from 'class-validator';
import { ListingType, TransactionStatus } from '@prisma/client';


export class UpdateListingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  pricePerHour?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  estimatedHours?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}