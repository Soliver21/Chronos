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
import { ListingService } from "./listing.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("listings")
@ApiBearerAuth()
@Controller("listings")
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  @ApiOperation({summary:"hirdetések elérése"})
  @ApiOkResponse({description:"Hirdetések listája"})
  getAll(@Query("categoryId") categoryId?: string) {
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.listingService.findAll(parsedCategoryId);
  }

  @Get(":id")
  @ApiOperation({summary:"hirdetések lekérése id alapján"})
  @ApiParam({name:"id", type: String, description: "A hirdetés azonosítója"})
  @ApiNotFoundResponse({description: "Nem található id"})
  @ApiOkResponse({description: "hirdetés id-ja"})
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.listingService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary:"Új hirdetés létrehozása"})
  @ApiBody({type: CreateListingDto})
  @ApiCreatedResponse({description:"létrehozott hirdetés"})
  create(@Req() req: { user: { id: number } }, @Body() dto: CreateListingDto) {
    return this.listingService.create(req.user.id, dto);
  }

@UseGuards(JwtAuthGuard)
@Patch(":id")
@ApiOperation({ summary: "Hirdetés módosítása" })
@ApiParam({
  name: "id",
  type: Number,
  description: "A módosítandó hirdetés azonosítója",
})
@ApiBody({ type: UpdateListingDto })
@ApiOkResponse({ description: "Módosított hirdetés" })
update(
  @Param("id", ParseIntPipe) id: number,
  @Req() req: { user: { id: number } },
  @Body() dto: UpdateListingDto,
) {
  return this.listingService.update(id, req.user.id, dto);
}


  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({summary:"Hirdetés törlése id alapján"})
  @ApiParam({name: "id",type:Number, description:"A hirdetés azonosítója"})
  @ApiNotFoundResponse({description:"Nem talált azonosító"})
  @ApiOkResponse({description:"Törölt hirdetés azonosítója"})
  remove(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.listingService.remove(id, req.user.id);
  }
}
