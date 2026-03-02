import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { TrustLevel, Role } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AdminUpdateUserDto {
  @ApiPropertyOptional({ enum: TrustLevel, example: TrustLevel.TRUSTED, description: 'Override the user trust level' })
  @IsOptional()
  @IsEnum(TrustLevel)
  trustLevel?: TrustLevel;

  @ApiPropertyOptional({ enum: Role, example: Role.ADMIN, description: 'Change the user role (USER or ADMIN)' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: false, description: 'Set to false to ban the user, true to restore access' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
