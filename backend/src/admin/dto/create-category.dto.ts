import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Home & Maintenance', description: 'Display name of the category' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'home-maintenance', description: 'URL-friendly slug (unique)' })
  @IsString()
  @MinLength(2)
  slug: string;
}
