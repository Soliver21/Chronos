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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  //Returns the profile of the currently authenticated user based on their JWT token.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saját felhasználói profil lekérése' })
  @ApiOkResponse({ description: 'Bejelentkezett felhasználó profil adatai' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  async getMyProfile(@Req() req: any) {
    return await this.service.findById(req.user.id);
  }

  //Returns the public profile of any user by their numeric ID.
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Felhasználói profil lekérése azonosító alapján' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Felhasználó azonosító',
  })
  @ApiOkResponse({ description: 'Felhasználó profil adatai' })
  @ApiNotFoundResponse({ description: 'A megadott azonosítójú felhasználó nem található' })
  async getUserProfileById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.findById(id);
  }

  //Partially updates the authenticated user's profile fields (name, email, bio, avatar).
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saját felhasználói profil módosítása' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ description: 'Felhasználói profil sikeresen frissítve' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiBadRequestResponse({ description: 'Érvénytelen bemeneti adatok (pl. hibás email formátum)' })
  async patchMember(
    @Req() req: any,
    @Body() member: UpdateUserDTO,
  ) {
    return await this.service.updateUser(req.user.id, member);
  }

  //Returns aggregated statistics for a user: total transactions, reviews, credits spent and average rating. 
  @Public()
  @Get(':id/stats')
  @ApiOperation({ summary: 'Felhasználói statisztikák lekérése' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Felhasználó azonosító',
  })
  @ApiOkResponse({ description: 'Felhasználó statisztikai adatai' })
  @ApiNotFoundResponse({ description: 'A megadott azonosítójú felhasználó nem található' })
  async getUserStatistics(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.getUserStatistics(id);
  }
}
