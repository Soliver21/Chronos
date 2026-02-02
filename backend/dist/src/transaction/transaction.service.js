"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionService = class TransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateTrustLevel(completedTxCount) {
        if (completedTxCount >= 20)
            return client_1.TrustLevel.VETERAN;
        if (completedTxCount >= 5)
            return client_1.TrustLevel.TRUSTED;
        return client_1.TrustLevel.NEWCOMER;
    }
    async updateTrustLevel(userId) {
        const completedCount = await this.prisma.transaction.count({
            where: {
                providerId: userId,
                status: client_1.TransactionStatus.COMPLETED,
            },
        });
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { trustLevel: true },
        });
        if (!user)
            return;
        const newLevel = this.calculateTrustLevel(completedCount);
        if (newLevel !== user.trustLevel) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { trustLevel: newLevel },
            });
        }
    }
    async createTransaction(clientId, dto) {
        const listingId = parseInt(dto.listingId, 10);
        if (isNaN(listingId)) {
            throw new common_1.BadRequestException('Invalid listing ID');
        }
        return this.prisma.$transaction(async (tx) => {
            const listing = await tx.listing.findUnique({
                where: { id: listingId },
                include: { user: true },
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            if (listing.userId === clientId) {
                throw new common_1.BadRequestException('Cannot create transaction with your own listing');
            }
            const totalPrice = listing.pricePerHour * dto.agreedHours;
            const client = await tx.user.findUnique({
                where: { id: clientId },
                select: { balance: true },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            if (client.balance < totalPrice) {
                throw new common_1.BadRequestException(`Insufficient credits. Required: ${totalPrice}, Available: ${client.balance}`);
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
                    status: client_1.TransactionStatus.PENDING,
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
    async findById(id) {
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
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async completeTransaction(txId, clientId) {
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
                throw new common_1.NotFoundException('Transaction not found');
            }
            if (transaction.clientId !== clientId) {
                throw new common_1.ForbiddenException('Only the client can complete the transaction');
            }
            if (transaction.status !== client_1.TransactionStatus.PENDING) {
                throw new common_1.BadRequestException('Transaction must be pending to complete');
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
                    status: client_1.TransactionStatus.COMPLETED,
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
    async cancelTransaction(txId, userId) {
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
                throw new common_1.NotFoundException('Transaction not found');
            }
            if (transaction.clientId !== userId &&
                transaction.providerId !== userId) {
                throw new common_1.ForbiddenException('Only the client or provider can cancel the transaction');
            }
            if (transaction.status !== client_1.TransactionStatus.PENDING) {
                throw new common_1.BadRequestException('Only pending transactions can be cancelled');
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
                    status: client_1.TransactionStatus.CANCELLED,
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
    async getUserTransactions(userId) {
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
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map