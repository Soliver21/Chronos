import { Controller, Post, Get, Body, Param, UseGuards, Req, ParseIntPipe } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { Public } from "../auth/public.decorator";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("reviews")
@ApiBearerAuth()
@Controller("reviews")
export class ReviewController {
    constructor(private readonly service: ReviewService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Új vélemény létrehozása"})
    @ApiBody({type: CreateReviewDTO})
    @ApiCreatedResponse({description:"létrehozott vélemény"})
    @Post()
    async createReview(@Body() dto: CreateReviewDTO, @Req() req: any) {
        return await this.service.create(dto, req.user.id);
    }

    @Get("user/:userId")
    @ApiOperation({summary:"vélemény lekérése UserId alapján"})
    @ApiParam({name:"id", type: String, description: "A vélemény azonosítója"})
    @ApiNotFoundResponse({description: "Nem található UserId"})
    @ApiOkResponse({description: "Vélemény UserId-ja"})
    async getUserReviews(@Param("userId", ParseIntPipe) userId: number) {
        return await this.service.getUserReviews(userId);
    }

    @Public()
    @Get("service/latest/:limit")
    @ApiOperation({ summary: "Legfrissebb szolgáltatás értékelések lekérése (limittel)" })
    @ApiParam({
        name: "limit",
        type: Number,
        description: "Visszaadott értékelések maximális száma",
        example: 5,
    })
    @ApiOkResponse({
        description: "Legfrissebb szolgáltatás értékelések listája",
    })
    getServiceReviewsWithLimit(
    @Param("limit", ParseIntPipe) limit: number,
    ) {
        return this.service.getServiceReviews(limit);
    }


    @Public()
    @Get("service/latest")
    @ApiOperation({ summary: "Legfrissebb szolgáltatás értékelések lekérése (alapértelmezett: 10)" })
    @ApiOkResponse({
        description: "Legfrissebb szolgáltatás értékelések listája",
    })
    getServiceReviews() {
        return this.service.getServiceReviews(10);
    }

}