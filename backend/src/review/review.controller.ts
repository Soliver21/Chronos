import { Controller, Post, Get, Body, Param, UseGuards, Req, ParseIntPipe } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { Public } from "../auth/public.decorator";

@Controller("reviews")
export class ReviewController {
    constructor(private readonly service: ReviewService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createReview(@Body() dto: CreateReviewDTO, @Req() req: any) {
        return await this.service.create(dto, req.user.id);
    }

    @Get("user/:userId")
    async getUserReviews(@Param("userId", ParseIntPipe) userId: number) {
        return await this.service.getUserReviews(userId);
    }

    @Public()
    @Get("service/latest/:limit?")
    async getServiceReviews(@Param("limit") limit?: string) {
        const parsedLimit = limit ? parseInt(limit, 10) : 10;
        return await this.service.getServiceReviews(parsedLimit);
    }
}
