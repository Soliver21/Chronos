import { ListingType, TransactionStatus } from '@prisma/client';
export declare class UpdateListingDto {
    title?: string;
    description?: string;
    categoryId?: number;
    type?: ListingType;
    pricePerHour?: number;
    estimatedHours?: number;
    imageUrl?: string;
    status?: TransactionStatus;
}
