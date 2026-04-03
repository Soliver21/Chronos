import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { ResolveAction, ResolveTransactionDto } from './dto/resolve-transaction.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // Visszaadja a platform összesített adatait az admin dashboardhoz.
  async getStats() {
    const [totalUsers, totalListings, totalReviews, pendingTransactions, completedTransactions, cancelledTransactions] = await Promise.all(
    [
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.review.count(),
      this.prisma.transaction.count({ where: { status: TransactionStatus.PENDING } }),
      this.prisma.transaction.count({ where: { status: TransactionStatus.COMPLETED } }),
      this.prisma.transaction.count({ where: { status: TransactionStatus.CANCELLED } }),
    ]);

    return {
      totalUsers,
      totalListings,
      totalReviews,
      transactions: {
        pending: pendingTransactions,
        completed: completedTransactions,
        cancelled: cancelledTransactions,
        total: pendingTransactions + completedTransactions + cancelledTransactions
      },
    };
  }

  // Visszaadja az összes felhasználót szereppel, bizalmi szinttel és aktív státusszal.
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        trustLevel: true,
        isActive: true,
        averageRating: true,
        balance: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  // Frissíti a felhasználó szerepét, bizalmi szintjét vagy aktív (tiltott) státuszát.
  async adminUpdateUser(id: number, dto: AdminUpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        trustLevel: true,
        isActive: true,
      },
    });
  }

  // Töröl egy hirdetést függetlenül attól, ki a tulajdonosa.
  async adminDeleteListing(id: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    return this.prisma.listing.delete({ where: { id } });
  }

  // Töröl egy értékelést azonosító alapján.
  async adminDeleteReview(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.delete({ where: { id } });
  }

  // Admin jogon lezár vagy töröl egy PENDING tranzakciót, és kezeli az egyenleg-átadást.
  async adminResolveTransaction(id: number, dto: ResolveTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: { select: { id: true, title: true, pricePerHour: true } },
        },
      });

      if (!transaction) throw new NotFoundException('Transaction not found');

      if (transaction.status !== TransactionStatus.PENDING) {
        throw new BadRequestException('Only PENDING transactions can be resolved');
      }

      if (dto.action === ResolveAction.COMPLETE) {
        // Összeg átutalása a szolgáltatónak
        await tx.user.update({
          where: { id: transaction.providerId },
          data: { balance: { increment: transaction.totalPrice } },
        });

        return tx.transaction.update({
          where: { id },
          data: { status: TransactionStatus.COMPLETED, completedAt: new Date() },
          include: {
            client: { select: { id: true, name: true, avatar: true } },
            provider: { select: { id: true, name: true, avatar: true } },
            listing: { select: { id: true, title: true, pricePerHour: true } },
          },
        });
      } else {
        // Visszatérítés a megrendelőnek
        await tx.user.update({
          where: { id: transaction.clientId },
          data: { balance: { increment: transaction.totalPrice } },
        });

        return tx.transaction.update({
          where: { id },
          data: { status: TransactionStatus.CANCELLED, cancelledAt: new Date() },
          include: {
            client: { select: { id: true, name: true, avatar: true } },
            provider: { select: { id: true, name: true, avatar: true } },
            listing: { select: { id: true, title: true, pricePerHour: true } },
          },
        });
      }
    });
  }

  // ── Diagram adatok

  // Visszaadja a felhasználók megoszlását bizalmi szint, szerep és aktív/tiltott státusz szerint, valamint az elmúlt 30 nap napi regisztrációit.
  async getUserChartData() {
    const [byTrustLevel, byRole, activeCount, bannedCount] = await Promise.all([
      this.prisma.user.groupBy({ by: ['trustLevel'], _count: { _all: true } }),
      this.prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { isActive: false } }),
    ]);

    // Napi regisztrációk az elmúlt 30 napban (nyers SQL dátum-csonkítással)
    const registrationsLast30Days: { date: string; count: number }[] =
      await this.prisma.$queryRaw`
        SELECT DATE(createdAt) AS date, COUNT(*) AS count
        FROM User
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(createdAt)
        ORDER BY date ASC
      `;

    return {
      byTrustLevel: byTrustLevel.map((r) => ({ trustLevel: r.trustLevel, count: r._count._all })),
      byRole: byRole.map((r) => ({ role: r.role, count: r._count._all })),
      activeVsBanned: { active: activeCount, banned: bannedCount },
      registrationsLast30Days: registrationsLast30Days.map((r) => ({
        date: r.date,
        count: Number(r.count),
      })),
    };
  }

  // Visszaadja a hirdetések megoszlását kategória és típus (OFFER/REQUEST) szerint, valamint az elmúlt 30 nap napi hirdetés-létrehozási számait.
  async getListingChartData() {
    const [byType, categories] = await Promise.all([
      this.prisma.listing.groupBy({ by: ['type'], _count: { _all: true } }),
      this.prisma.listingCategory.findMany({
        select: {
          id: true,
          name: true,
          _count: { select: { listings: true } },
        },
      }),
    ]);

    // Napi hirdetés-létrehozás az elmúlt 30 napban
    const createdLast30Days: { date: string; count: number }[] =
      await this.prisma.$queryRaw`
        SELECT DATE(createdAt) AS date, COUNT(*) AS count
        FROM Listing
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(createdAt)
        ORDER BY date ASC
      `;

    return {
      byType: byType.map((r) => ({ type: r.type, count: r._count._all })),
      byCategory: categories.map((c) => ({ category: c.name, count: c._count.listings })),
      createdLast30Days: createdLast30Days.map((r) => ({
        date: r.date,
        count: Number(r.count),
      })),
    };
  }


  // Visszaadja az értékelések eloszlását 1-től 5-ig és az átlagos értékelést.
  async getReviewChartData() {
    const distribution = await this.prisma.review.groupBy({
      by: ['rating'],
      _count: { _all: true },
      orderBy: { rating: 'asc' },
    });

    const aggregate = await this.prisma.review.aggregate({ _avg: { rating: true } });

    return {
      ratingDistribution: distribution.map((r) => ({ rating: r.rating, count: r._count._all })),
      averageRating: aggregate._avg.rating ? Number(aggregate._avg.rating.toFixed(2)) : null,
    };
  }

  // Visszaadja az összes tranzakciót a platformon, admin nézethez.
  async getAllTransactions() {
    return this.prisma.transaction.findMany({
      include: {
        client: { select: { id: true, name: true, avatar: true } },
        provider: { select: { id: true, name: true, avatar: true } },
        listing: { select: { id: true, title: true, pricePerHour: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Létrehoz egy új hirdetési kategóriát.
  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.listingCategory.create({ data: dto });
  }

  // Frissíti egy létező kategória nevét vagy slug-ját.
  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const category = await this.prisma.listingCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.listingCategory.update({ where: { id }, data: dto });
  }

  // Töröl egy kategóriát azonosító alapján.
  async deleteCategory(id: number) {
    const category = await this.prisma.listingCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.listingCategory.delete({ where: { id } });
  }
}
