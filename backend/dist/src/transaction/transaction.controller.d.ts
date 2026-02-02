import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getUserTransactions(req: {
        user: {
            id: number;
        };
    }): Promise<({
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
    getById(id: number): Promise<{
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
    create(req: {
        user: {
            id: number;
        };
    }, dto: CreateTransactionDto): Promise<{
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
    completeTransaction(id: number, req: {
        user: {
            id: number;
        };
    }): Promise<{
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
    cancelTransaction(id: number, req: {
        user: {
            id: number;
        };
    }): Promise<{
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
}
