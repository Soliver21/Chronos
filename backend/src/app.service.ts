import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
 
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
 
  // Teszt endpoint – visszaad egy üdvözlő szöveget.
  getHello(): string {
    return 'Hello World!';
  }

  // Nyilvánosan elérhető platformstatisztikákat ad vissza (felhasználók, tranzakciók, értékelések).
  async getPublicStats() {
    const [totalUsers, completedTransactions, reviews] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.transaction.count({ where: { status: 'COMPLETED' } }),
      this.prisma.review.aggregate({ _avg: { rating: true }, _count: { _all: true } }),
    ]);
 
    return {
      totalUsers,
      completedTransactions,
      averageRating: reviews._avg.rating
        ? Number(reviews._avg.rating.toFixed(1))
        : null,
      totalReviews: reviews._count._all,
    };
  }
}