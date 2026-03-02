import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminService } from './admin.service';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { ResolveTransactionDto } from './dto/resolve-transaction.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ── Stats

  // Returns platform-wide statistics: user count, listing count, transaction breakdown and total completed volume.
  @Get('stats')
  @ApiOperation({ summary: '[Admin] Platform statisztikák lekérése' })
  @ApiOkResponse({ description: 'Platform-szintű statisztikák' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getStats() {
    return this.adminService.getStats();
  }

  // ── Charts
  //Returns user distribution by trust level, role and active/banned status, plus daily registration counts for the last 30 days.
  @Get('charts/users')
  @ApiOperation({ summary: '[Admin] Felhasználói diagram adatok lekérése' })
  @ApiOkResponse({
    description: 'Felhasználók megoszlása trust szint, szerepkör és aktivitás szerint; napi regisztrációk az elmúlt 30 napra',
  })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getUserChartData() {
    return this.adminService.getUserChartData();
  }

  // Returns listing distribution by category and type (OFFER/REQUEST), plus daily new listing counts for the last 30 days. 
  @Get('charts/listings')
  @ApiOperation({ summary: '[Admin] Hirdetési diagram adatok lekérése' })
  @ApiOkResponse({
    description: 'Hirdetések megoszlása kategória és típus szerint; napi új hirdetések az elmúlt 30 napra',
  })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getListingChartData() {
    return this.adminService.getListingChartData();
  }

  //Returns the distribution of review ratings (1–5 stars) and the platform-wide average rating.
  @Get('charts/reviews')
  @ApiOperation({ summary: '[Admin] Értékelési diagram adatok lekérése' })
  @ApiOkResponse({
    description: 'Értékelések (1–5 csillag) megoszlása és platform-szintű átlag',
  })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getReviewChartData() {
    return this.adminService.getReviewChartData();
  }

  // ── Users

  //Returns all registered users with their role, trust level, balance and active status.
  @Get('users')
  @ApiOperation({ summary: '[Admin] Összes felhasználó lekérése' })
  @ApiOkResponse({ description: 'Felhasználók listája' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // Updates a user's role, trust level or ban status (isActive).
  @Patch('users/:id')
  @ApiOperation({ summary: '[Admin] Felhasználó módosítása (szerepkör, trust szint, ban)' })
  @ApiParam({ name: 'id', type: Number, description: 'Felhasználó azonosítója' })
  @ApiBody({ type: AdminUpdateUserDto })
  @ApiOkResponse({ description: 'Módosított felhasználó adatai' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A felhasználó nem található' })
  adminUpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminUpdateUserDto,
  ) {
    return this.adminService.adminUpdateUser(id, dto);
  }

  // ── Listings ───────────────────────────────────────────────────────────────

  // Deletes any listing by ID regardless of who owns it.
  @Delete('listings/:id')
  @ApiOperation({ summary: '[Admin] Hirdetés törlése (bármelyik)' })
  @ApiParam({ name: 'id', type: Number, description: 'Hirdetés azonosítója' })
  @ApiOkResponse({ description: 'Hirdetés sikeresen törölve' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A hirdetés nem található' })
  adminDeleteListing(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.adminDeleteListing(id);
  }

  // ── Reviews ────────────────────────────────────────────────────────────────

  // Deletes any review by ID (e.g. to remove abusive content).
  @Delete('reviews/:id')
  @ApiOperation({ summary: '[Admin] Vélemény törlése (bármelyik)' })
  @ApiParam({ name: 'id', type: Number, description: 'Vélemény azonosítója' })
  @ApiOkResponse({ description: 'Vélemény sikeresen törölve' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A vélemény nem található' })
  adminDeleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.adminDeleteReview(id);
  }

  // ── Transactions ───────────────────────────────────────────────────────────

  // Returns all platform transactions (not filtered by user).
  @Get('transactions')
  @ApiOperation({ summary: '[Admin] Összes tranzakció lekérése' })
  @ApiOkResponse({ description: 'Platform-szintű tranzakciók listája' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  getAllTransactions() {
    return this.adminService.getAllTransactions();
  }

  // Force-resolves a stuck PENDING transaction as admin: either complete (pays provider) or cancel (refunds client).
  @Post('transactions/:id/resolve')
  @ApiOperation({ summary: '[Admin] Tranzakció kényszerített lezárása vagy megszakítása' })
  @ApiParam({ name: 'id', type: Number, description: 'Tranzakció azonosítója' })
  @ApiBody({ type: ResolveTransactionDto })
  @ApiOkResponse({ description: 'Tranzakció sikeresen kezelve' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A tranzakció nem található' })
  @ApiBadRequestResponse({ description: 'A tranzakció nem PENDING állapotban van' })
  adminResolveTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ResolveTransactionDto,
  ) {
    return this.adminService.adminResolveTransaction(id, dto);
  }

  // ── Categories ─────────────────────────────────────────────────────────────

  /** Creates a new listing category. */
  @Post('categories')
  @ApiOperation({ summary: '[Admin] Új kategória létrehozása' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ description: 'Sikeresen létrehozott kategória' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiBadRequestResponse({ description: 'Érvénytelen bemeneti adatok' })
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.adminService.createCategory(dto);
  }

  /** Updates an existing category's name or slug. */
  @Patch('categories/:id')
  @ApiOperation({ summary: '[Admin] Kategória módosítása' })
  @ApiParam({ name: 'id', type: Number, description: 'Kategória azonosítója' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ description: 'Módosított kategória' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A kategória nem található' })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.adminService.updateCategory(id, dto);
  }

  /** Deletes a category by ID. */
  @Delete('categories/:id')
  @ApiOperation({ summary: '[Admin] Kategória törlése' })
  @ApiParam({ name: 'id', type: Number, description: 'Kategória azonosítója' })
  @ApiOkResponse({ description: 'Kategória sikeresen törölve' })
  @ApiUnauthorizedResponse({ description: 'Hiányzó vagy érvénytelen JWT token' })
  @ApiForbiddenResponse({ description: 'Csak admin férhet hozzá' })
  @ApiNotFoundResponse({ description: 'A kategória nem található' })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteCategory(id);
  }
}
