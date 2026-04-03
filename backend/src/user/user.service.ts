import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    // Visszaad egy felhasználót azonosító alapján (jelszó nélkül); ha nem létezik, 404-et dob.
    async findById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }, select: { id: true, name: true, email: true, bio: true, avatar: true, balance: true, trustLevel: true, averageRating: true },
        });
        if (!user) throw new NotFoundException(`User not found`);
        return user;
    }

    // Frissíti a felhasználó profiladatait (név, bio, avatar stb.).
    async updateUser(id: number, user: UpdateUserDTO) {
        return await this.prisma.user.update({
            where: { id },
            data: user,
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                avatar: true,
                balance: true,
                trustLevel: true,
                averageRating: true,
            },
        });
    }

    // Visszaadja a felhasználó statisztikáit: tranzakciók, értékelések, elköltött/kapott összeg, átlagos értékelés.
    async getUserStatistics(id: number) {
        const [clientTransactions, providerTransactions, reviews] = await Promise.all([
            this.prisma.transaction.findMany({
                where: { clientId: id },
                include: {
                    listing: { select: { id: true, title: true, pricePerHour: true } },
                    client: { select: { id: true, name: true, avatar: true } },
                    provider: { select: { id: true, name: true, avatar: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.transaction.findMany({
                where: { providerId: id },
                include: {
                    listing: { select: { id: true, title: true, pricePerHour: true } },
                    client: { select: { id: true, name: true, avatar: true } },
                    provider: { select: { id: true, name: true, avatar: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.review.findMany({
                where: { userId: id },
                include: {
                    user: { select: { id: true, name: true, avatar: true } },
                },
            }),
        ]);

        const transactions = [...clientTransactions, ...providerTransactions];
        const totalTransactions = transactions.length;
        const totalReviews = reviews.length;

        const totalAmount = transactions.reduce((sum, t: any) => sum + (t.totalPrice ?? 0), 0);

        const averageRating =
            totalReviews === 0
                ? null
                : Number(
                    (
                        reviews.reduce((sum: number, r: any) => sum + (r.rating ?? 0), 0) /
                        totalReviews
                    ).toFixed(2)
                );

        return {
            totalTransactions,
            totalReviews,
            totalAmount,
            averageRating,
            transactions,
            reviews,
        };
    }
}