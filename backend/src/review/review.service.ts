import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDTO } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateReviewDTO, reviewerId: number) {
        const transactionId = dto.transactionId;

        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
        });

        if (!transaction) {
            throw new NotFoundException("Transaction not found");
        }

        if (transaction.status !== "COMPLETED") {
            throw new BadRequestException("Transaction must be completed to create a review");
        }

        const existingReview = await this.prisma.review.findUnique({
            where: { transactionId },
        });

        if (existingReview) {
            throw new BadRequestException("Review already exists for this transaction");
        }

        const reviewedUserId = transaction.clientId === reviewerId ? transaction.providerId : transaction.clientId;

        const review = await this.prisma.review.create({
            data: {
                rating: dto.rating,
                comment: dto.comment || null,
                userId: reviewedUserId,
                transactionId,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                transaction: true,
            },
        });

        await this.updateUserAverageRating(reviewedUserId);

        return review;
    }

    async getUserReviews(userId: number) {
        return await this.prisma.review.findMany({
            where: { userId },
            include: {
                transaction: {
                    include: {
                        listing: true,
                    },
                },
            },
            orderBy: { id: "desc" },
        });
    }

    async getServiceReviews(limit: number = 10) {
        return await this.prisma.review.findMany({
            take: limit,
            include: {
                transaction: {
                    include: {
                        listing: true,
                    },
                },
            },
            orderBy: { id: "desc" },
        });
    }

    private async updateUserAverageRating(userId: number) {
        const reviews = await this.prisma.review.findMany({
            where: { userId },
        });

        if (reviews.length === 0) {
            return;
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                averageRating: parseFloat(averageRating.toFixed(2)),
            },
        });
    }
}
