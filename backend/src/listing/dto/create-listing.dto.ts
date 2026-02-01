import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ListingType } from '@prisma/client';

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsEnum(ListingType)
  type: ListingType;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
