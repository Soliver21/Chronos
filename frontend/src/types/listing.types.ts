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

// filters currently map to query params accepted by the backend; extra
// fields are mostly for future use but convenient on the frontend.
export interface ListingFilter {
    category?: string | number;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}