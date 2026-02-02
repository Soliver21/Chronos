import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
export declare class ListingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(categoryId?: number): Promise<({
        user: {
            name: string;
            id: number;
            avatar: string;
        };
        category: {
            name: string;
            slug: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string;
        type: import(".prisma/client").$Enums.ListingType;
        imageUrl: string | null;
        pricePerHour: number;
        estimatedHours: number | null;
        categoryId: number;
        userId: number;
    })[]>;
    findById(id: number): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string;
        };
        category: {
            name: string;
            slug: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string;
        type: import(".prisma/client").$Enums.ListingType;
        imageUrl: string | null;
        pricePerHour: number;
        estimatedHours: number | null;
        categoryId: number;
        userId: number;
    }>;
    create(userId: number, dto: CreateListingDto): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string;
        };
        category: {
            name: string;
            slug: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string;
        type: import(".prisma/client").$Enums.ListingType;
        imageUrl: string | null;
        pricePerHour: number;
        estimatedHours: number | null;
        categoryId: number;
        userId: number;
    }>;
    update(id: number, userId: number, dto: UpdateListingDto): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string;
        };
        category: {
            name: string;
            slug: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string;
        type: import(".prisma/client").$Enums.ListingType;
        imageUrl: string | null;
        pricePerHour: number;
        estimatedHours: number | null;
        categoryId: number;
        userId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        type: import(".prisma/client").$Enums.ListingType;
        imageUrl: string | null;
        pricePerHour: number;
        estimatedHours: number | null;
        categoryId: number;
        userId: number;
    }>;
}
