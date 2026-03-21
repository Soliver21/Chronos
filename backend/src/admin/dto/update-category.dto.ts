import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Home & Maintenance', description: 'New display name of the category' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'home-maintenance', description: 'New URL-friendly slug' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  slug?: string;

  @ApiPropertyOptional({ example: '/uploads/categories/Home%20%26%20Maintenance.jpg', description: 'Category image URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
