import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    getMyProfile(req: any): Promise<{
        name: string;
        email: string;
        bio: string;
        avatar: string;
        id: number;
    }>;
    getUserProfileById(id: number): Promise<{
        name: string;
        email: string;
        bio: string;
        avatar: string;
        id: number;
    }>;
    patchMember(req: any, member: UpdateUserDTO): Promise<{
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
