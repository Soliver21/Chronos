import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ListingType } from '@prisma/client';

export class UpdateListingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
