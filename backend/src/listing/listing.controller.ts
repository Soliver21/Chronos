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
  Req,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Public } from "../auth/public.decorator";
import { ListingService } from "./listing.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("listings")
@Controller("listings")
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  // Returns all listings, optionally filtered by a category ID passed as a query parameter.
  @Public()
  @Get()
  @ApiOperation({ summary: "Összes hirdetés lekérése (opcionálisan kategória szerint szűrve)" })
  @ApiQuery({
    name: "categoryId",
    required: false,
    type: Number,
    description: "Kategória azonosítója a szűréshez",
  })
  @ApiOkResponse({ description: "Hirdetések listája" })
  getAll(@Query("categoryId") categoryId?: string) {
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.listingService.findAll(parsedCategoryId);
  }

  // Returns listings owned by the authenticated user.
  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Bejelentkezett felhasználó saját hirdetései" })
  @ApiOkResponse({ description: "Saját hirdetések listája" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  getMyListings(@Req() req: { user: { id: number } }) {
    return this.listingService.findByUserId(req.user.id);
  }

  // Returns a single listing by its ID, including the owner and category details.
  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Hirdetés lekérése id alapján" })
  @ApiParam({ name: "id", type: Number, description: "A hirdetés azonosítója" })
  @ApiOkResponse({ description: "A kért hirdetés adatai" })
  @ApiNotFoundResponse({ description: "Nem található hirdetés a megadott azonosítóval" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.listingService.findById(id);
  }

  // Creates a new listing owned by the authenticated user.
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Új hirdetés létrehozása" })
  @ApiBody({ type: CreateListingDto })
  @ApiCreatedResponse({ description: "Sikeresen létrehozott hirdetés" })
  @ApiBadRequestResponse({ description: "Érvénytelen bemeneti adatok (validációs hiba)" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  create(@Req() req: { user: { id: number } }, @Body() dto: CreateListingDto) {
    return this.listingService.create(req.user.id, dto);
  }

  // Updates the fields of a listing; only the owner of the listing can make changes.
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Hirdetés módosítása" })
  @ApiParam({ name: "id", type: Number, description: "A módosítandó hirdetés azonosítója" })
  @ApiBody({ type: UpdateListingDto })
  @ApiOkResponse({ description: "Módosított hirdetés adatai" })
  @ApiBadRequestResponse({ description: "Érvénytelen bemeneti adatok (validációs hiba)" })
  @ApiNotFoundResponse({ description: "A hirdetés nem található, vagy nem a saját hirdetésed" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  update(@Param("id", ParseIntPipe) id: number, @Req() req: { user: { id: number } }, @Body() dto: UpdateListingDto,) {
    return this.listingService.update(id, req.user.id, dto);
  }

  // Deletes a listing by ID; only the owner of the listing can delete it.
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Hirdetés törlése id alapján" })
  @ApiParam({ name: "id", type: Number, description: "A törölendő hirdetés azonosítója" })
  @ApiOkResponse({ description: "Törölt hirdetés adatai" })
  @ApiNotFoundResponse({ description: "A hirdetés nem található, vagy nem a saját hirdetésed" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  remove(@Param("id", ParseIntPipe) id: number, @Req() req: { user: { id: number } },) {
    return this.listingService.remove(id, req.user.id);
  }
}