import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<{
        name: string;
        email: string;
        bio: string;
        avatar: string;
        id: number;
    }>;
    updateUser(id: number, user: UpdateUserDTO): Promise<{
        name: string;
        email: string;
        bio: string;
        avatar: string;
        id: number;
    }>;
    getUserStatistics(id: number): Promise<{
        totalTransactions: number;
        totalReviews: number;
        totalAmount: any;
        averageRating: number;
        transactions: {
            id: number;
            userId: number;
            status: import(".prisma/client").$Enums.TransactionStatus;
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
