import { ListingType } from '@prisma/client';
export declare class CreateListingDto {
    title: string;
    description: string;
    categoryId: number;
    type: ListingType;
    pricePerHour: number;
    estimatedHours?: number;
    imageUrl?: string;
}
