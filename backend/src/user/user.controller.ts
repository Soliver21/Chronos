import {
  Controller,
  ParseIntPipe,
  UseGuards,
  Get,
  Patch,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  /**
   * Get authenticated user's profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saját felhasználói profil lekérése' })
  @ApiOkResponse({
    description: 'Bejelentkezett felhasználó profil adatai',
  })
  async getMyProfile(@Req() req: any) {
    return await this.service.findById(req.user.id);
  }

  /**
   * Get user profile by ID (public)
   */
  @Get(':id')
  @ApiOperation({ summary: 'Felhasználói profil lekérése azonosító alapján' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Felhasználó azonosító',
  })
  @ApiOkResponse({
    description: 'Felhasználó profil adatai',
  })
  async getUserProfileById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.findById(id);
  }

  /**
   * Update authenticated user's profile
   */
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saját felhasználói profil módosítása' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({
    description: 'Felhasználói profil sikeresen frissítve',
  })
  async patchMember(
    @Req() req: any,
    @Body() member: UpdateUserDTO,
  ) {
    return await this.service.updateUser(req.user.id, member);
  }

  /**
   * Get user statistics (public)
   */
  @Get(':id/stats')
  @ApiOperation({ summary: 'Felhasználói statisztikák lekérése' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Felhasználó azonosító',
  })
  @ApiOkResponse({
    description: 'Felhasználó statisztikai adatai',
  })
  async getUserStatistics(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.getUserStatistics(id);
  }
}
