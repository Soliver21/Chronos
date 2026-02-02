import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    getAll(categoryId?: string): Promise<({
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
    getById(id: number): Promise<{
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
    create(req: {
        user: {
            id: number;
        };
    }, dto: CreateListingDto): Promise<{
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
    update(id: number, req: {
        user: {
            id: number;
        };
    }, dto: UpdateListingDto): Promise<{
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
    remove(id: number, req: {
        user: {
            id: number;
        };
    }): Promise<{
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
