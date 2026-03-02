import { Controller, Post, Get, Body, Param, UseGuards, Req, ParseIntPipe } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { CreateWebsiteReviewDTO } from "./dto/create-website-review.dto";
import { Public } from "../auth/public.decorator";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("reviews")
@Controller("reviews")
export class ReviewController {
    constructor(private readonly service: ReviewService) {}

    //Creates a review for a completed transaction; the reviewer is determined from the JWT token.
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Új vélemény létrehozása" })
    @ApiBody({ type: CreateReviewDTO })
    @ApiCreatedResponse({ description: "Sikeresen létrehozott vélemény" })
    @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
    @ApiNotFoundResponse({ description: "A tranzakció nem található" })
    @ApiBadRequestResponse({ description: "A tranzakció nem lezárt, vagy már létezik értékelés ehhez a tranzakcióhoz" })
    @Post()
    async createReview(@Body() dto: CreateReviewDTO, @Req() req: any) {
        return await this.service.create(dto, req.user.id);
    }

    //Returns all reviews written about a specific user, identified by their user ID.
    @Public()
    @Get("user/:userId")
    @ApiOperation({ summary: "Vélemények lekérése felhasználó azonosítója alapján" })
    @ApiParam({ name: "userId", type: Number, description: "A felhasználó azonosítója" })
    @ApiOkResponse({ description: "A felhasználóhoz tartozó vélemények listája" })
    async getUserReviews(@Param("userId", ParseIntPipe) userId: number) {
        return await this.service.getUserReviews(userId);
    }

    //Creates a website/platform review (not linked to any transaction).
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Weboldal értékelés létrehozása" })
    @ApiBody({ type: CreateWebsiteReviewDTO })
    @ApiCreatedResponse({ description: "Sikeresen létrehozott weboldal értékelés" })
    @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
    @Post("service")
    async createWebsiteReview(@Body() dto: CreateWebsiteReviewDTO, @Req() req: any) {
        return await this.service.createWebsiteReview(dto, req.user.id);
    }

    //Returns the N most recent reviews across the platform, where N is specified by the limit path parameter.
    @Public()
    @Get("service/latest/:limit")
    @ApiOperation({ summary: "Legfrissebb szolgáltatás értékelések lekérése (limittel)" })
    @ApiParam({
        name: "limit",
        type: Number,
        description: "Visszaadott értékelések maximális száma",
        example: 5,
    })
    @ApiOkResponse({ description: "Legfrissebb szolgáltatás értékelések listája" })
    getServiceReviewsWithLimit(
        @Param("limit", ParseIntPipe) limit: number,
    ) {
        return this.service.getServiceReviews(limit);
    }

    //Returns the 10 most recent reviews across the platform using a fixed default limit.
    @Public()
    @Get("service/latest")
    @ApiOperation({ summary: "Legfrissebb szolgáltatás értékelések lekérése (alapértelmezett: 10)" })
    @ApiOkResponse({ description: "Legfrissebb 10 szolgáltatás értékelés listája" })
    getServiceReviews() {
        return this.service.getServiceReviews(10);
    }
}
