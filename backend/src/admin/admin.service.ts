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

  // Returns platform-wide counts for the admin dashboard.
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

  // Returns all users with their role, trust level and active status.
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

  // Updates a user's role, trust level or active (ban) status.
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

  // Deletes any listing regardless of who owns it.
  async adminDeleteListing(id: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    return this.prisma.listing.delete({ where: { id } });
  }

  // Deletes a review by ID.
  async adminDeleteReview(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.delete({ where: { id } });
  }

  // Force-completes or force-cancels a PENDING transaction as admin, handling balance transfers.
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
        // Release funds to provider
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
        // Refund client
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

  // ── Chart data

  // Returns user breakdown by trust level, role and active/banned status, plus daily new-user counts for the last 30 days.
  async getUserChartData() {
    const [byTrustLevel, byRole, activeCount, bannedCount] = await Promise.all([
      this.prisma.user.groupBy({ by: ['trustLevel'], _count: { _all: true } }),
      this.prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { isActive: false } }),
    ]);

    // Daily registrations for the last 30 days (raw SQL for date truncation)
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

  // Returns listing breakdown by category (with names) and by type (OFFER/REQUEST), plus daily new-listing counts for the last 30 days.
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

    // Daily listing creation for the last 30 days
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


  // Returns the distribution of review ratings from 1 to 5 and the overall average rating.
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

  // Returns all platform transactions for admin view.
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

  // Creates a new listing category.
  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.listingCategory.create({ data: dto });
  }

  //Updates the name or slug of an existing category.
  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const category = await this.prisma.listingCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.listingCategory.update({ where: { id }, data: dto });
  }

  //Deletes a category by ID.
  async deleteCategory(id: number) {
    const category = await this.prisma.listingCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.listingCategory.delete({ where: { id } });
  }
}
