import type { User } from './user.types';

export type ListingType = 'OFFER' | 'REQUEST';

export interface ListingCategory {
    id: number;
    name: string;
    slug: string;
}

export interface Listing {
    id: number;
    title: string;
    description: string;
    type: ListingType;
    imageUrl?: string | null;
    pricePerHour: number;
    estimatedHours?: number | null;
    categoryId: number;
    category: ListingCategory;
    userId: number;
    user?: Pick<User, 'id' | 'name' | 'avatar'>;
}