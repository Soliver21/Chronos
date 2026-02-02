import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionStatus, TrustLevel } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}


  
  private calculateTrustLevel(completedTxCount: number): TrustLevel {
    if (completedTxCount >= 20) return TrustLevel.VETERAN;
    if (completedTxCount >= 5) return TrustLevel.TRUSTED;
    return TrustLevel.NEWCOMER;
  }

  private async updateTrustLevel(userId: number): Promise<void> {
    const completedCount = await this.prisma.transaction.count({
      where: {
        providerId: userId,
        status: TransactionStatus.COMPLETED,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { trustLevel: true },
    });

    if (!user) return;

    const newLevel = this.calculateTrustLevel(completedCount);

    if (newLevel !== user.trustLevel) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { trustLevel: newLevel },
      });
    }
  }




  async createTransaction(clientId: number, dto: CreateTransactionDto) {
    const listingId = parseInt(dto.listingId, 10);

    if (isNaN(listingId)) {
      throw new BadRequestException('Invalid listing ID');
    }

    return this.prisma.$transaction(async (tx) => {
      const listing = await tx.listing.findUnique({
        where: { id: listingId },
        include: { user: true },
      });

      if (!listing) {
        throw new NotFoundException('Listing not found');
      }

      if (listing.userId === clientId) {
        throw new BadRequestException(
          'Cannot create transaction with your own listing',
        );
      }

      const totalPrice = listing.pricePerHour * dto.agreedHours;

      const client = await tx.user.findUnique({
        where: { id: clientId },
        select: { balance: true },
      });

      if (!client) {
        throw new NotFoundException('Client not found');
      }

      if (client.balance < totalPrice) {
        throw new BadRequestException(
          `Insufficient credits. Required: ${totalPrice}, Available: ${client.balance}`,
        );
      }

      await tx.user.update({
        where: { id: clientId },
        data: {
          balance: { decrement: totalPrice },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          clientId,
          providerId: listing.userId,
          listingId,
          agreedHours: dto.agreedHours,
          totalPrice,
          status: TransactionStatus.PENDING,
        },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: {
            select: {
              id: true,
              title: true,
              description: true,
              pricePerHour: true,
              imageUrl: true,
              type: true,
            },
          },
        },
      });

      return transaction;
    });
  }

  async findById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        client: {
          select: { id: true, name: true, avatar: true, email: true },
        },
        provider: {
          select: { id: true, name: true, avatar: true, email: true },
        },
        listing: {
          select: {
            id: true,
            title: true,
            description: true,
            pricePerHour: true,
            imageUrl: true,
            type: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async completeTransaction(txId: number, clientId: number) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: txId },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: {
            select: {
              id: true,
              title: true,
              description: true,
              pricePerHour: true,
              imageUrl: true,
            },
          },
        },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      if (transaction.clientId !== clientId) {
        throw new ForbiddenException(
          'Only the client can complete the transaction',
        );
      }

      if (transaction.status !== TransactionStatus.PENDING) {
        throw new BadRequestException(
          'Transaction must be pending to complete',
        );
      }

      await tx.user.update({
        where: { id: transaction.providerId },
        data: {
          balance: { increment: transaction.totalPrice },
        },
      });

      const updatedTransaction = await tx.transaction.update({
        where: { id: txId },
        data: {
          status: TransactionStatus.COMPLETED,
          completedAt: new Date(),
        },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: {
            select: {
              id: true,
              title: true,
              description: true,
              pricePerHour: true,
              imageUrl: true,
            },
          },
        },
      });

      await this.updateTrustLevel(transaction.providerId);

      return updatedTransaction;
    });
  }





  async cancelTransaction(txId: number, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: txId },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: {
            select: {
              id: true,
              title: true,
              description: true,
              pricePerHour: true,
              imageUrl: true,
            },
          },
        },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      if (
        transaction.clientId !== userId &&
        transaction.providerId !== userId
      ) {
        throw new ForbiddenException(
          'Only the client or provider can cancel the transaction',
        );
      }

      if (transaction.status !== TransactionStatus.PENDING) {
        throw new BadRequestException(
          'Only pending transactions can be cancelled',
        );
      }

      await tx.user.update({
        where: { id: transaction.clientId },
        data: {
          balance: { increment: transaction.totalPrice },
        },
      });

      const updatedTransaction = await tx.transaction.update({
        where: { id: txId },
        data: {
          status: TransactionStatus.CANCELLED,
          cancelledAt: new Date(),
        },
        include: {
          client: { select: { id: true, name: true, avatar: true } },
          provider: { select: { id: true, name: true, avatar: true } },
          listing: {
            select: {
              id: true,
              title: true,
              description: true,
              pricePerHour: true,
              imageUrl: true,
            },
          },
        },
      });

      return updatedTransaction;
    });
  }




  
  async getUserTransactions(userId: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [{ clientId: userId }, { providerId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { id: true, name: true, avatar: true } },
        provider: { select: { id: true, name: true, avatar: true } },
        listing: {
          select: {
            id: true,
            title: true,
            description: true,
            pricePerHour: true,
            imageUrl: true,
            type: true,
          },
        },
      },
    });

    return transactions;
  }
}