import { IsString, MinLength, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Home & Maintenance', description: 'Display name of the category' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'home-maintenance', description: 'URL-friendly slug (unique)' })
  @IsString()
  @MinLength(2)
  slug: string;

  @ApiPropertyOptional({ example: '/uploads/categories/Home%20%26%20Maintenance.jpg', description: 'Category image URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
