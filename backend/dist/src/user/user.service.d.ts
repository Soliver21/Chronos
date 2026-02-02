import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<{
        name: string;
        id: number;
        email: string;
        bio: string;
        avatar: string;
    }>;
    updateUser(id: number, user: UpdateUserDTO): Promise<{
        name: string;
        id: number;
        email: string;
        bio: string;
        avatar: string;
    }>;
    getUserStatistics(id: number): Promise<{
        totalTransactions: number;
        totalReviews: number;
        totalAmount: any;
        averageRating: number;
        transactions: {
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
        }[];
        reviews: {
            id: number;
            userId: number;
            rating: number;
            comment: string | null;
            transactionId: number;
        }[];
    }>;
}
