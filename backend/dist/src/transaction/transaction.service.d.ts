import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private calculateTrustLevel;
    private updateTrustLevel;
    createTransaction(clientId: number, dto: CreateTransactionDto): Promise<{
        listing: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").$Enums.ListingType;
            imageUrl: string;
            pricePerHour: number;
        };
        client: {
            name: string;
            id: number;
            avatar: string;
        };
        provider: {
            name: string;
            id: number;
            avatar: string;
        };
    } & {
        id: number;
        agreedHours: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        cancelledAt: Date | null;
        clientId: number;
        providerId: number;
        listingId: number;
    }>;
    findById(id: number): Promise<{
        listing: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").$Enums.ListingType;
            imageUrl: string;
            pricePerHour: number;
        };
        client: {
            name: string;
            id: number;
            email: string;
            avatar: string;
        };
        provider: {
            name: string;
            id: number;
            email: string;
            avatar: string;
        };
    } & {
        id: number;
        agreedHours: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        cancelledAt: Date | null;
        clientId: number;
        providerId: number;
        listingId: number;
    }>;
    completeTransaction(txId: number, clientId: number): Promise<{
        listing: {
            id: number;
            title: string;
            description: string;
            imageUrl: string;
            pricePerHour: number;
        };
        client: {
            name: string;
            id: number;
            avatar: string;
        };
        provider: {
            name: string;
            id: number;
            avatar: string;
        };
    } & {
        id: number;
        agreedHours: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        cancelledAt: Date | null;
        clientId: number;
        providerId: number;
        listingId: number;
    }>;
    cancelTransaction(txId: number, userId: number): Promise<{
        listing: {
            id: number;
            title: string;
            description: string;
            imageUrl: string;
            pricePerHour: number;
        };
        client: {
            name: string;
            id: number;
            avatar: string;
        };
        provider: {
            name: string;
            id: number;
            avatar: string;
        };
    } & {
        id: number;
        agreedHours: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        cancelledAt: Date | null;
        clientId: number;
        providerId: number;
        listingId: number;
    }>;
    getUserTransactions(userId: number): Promise<({
        listing: {
            id: number;
            title: string;
            description: string;
            type: import(".prisma/client").$Enums.ListingType;
            imageUrl: string;
            pricePerHour: number;
        };
        client: {
            name: string;
            id: number;
            avatar: string;
        };
        provider: {
            name: string;
            id: number;
            avatar: string;
        };
    } & {
        id: number;
        agreedHours: number;
        totalPrice: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        cancelledAt: Date | null;
        clientId: number;
        providerId: number;
        listingId: number;
    })[]>;
}
