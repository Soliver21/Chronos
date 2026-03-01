import type{ Listing } from "./listing.types";
import type{ User } from './user.types';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';


//Megértés kéne
export interface Transaction {
    id: number;
    clientId: number;
    providerId: number;
    listingId: number;
    agreedHours: number;
    totalPrice: number;
    status: TransactionStatus;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null;
    cancelledAt?: string | null;
    client?: Pick<User, 'id' | 'name' | 'avatar'>;
    provider?: Pick<User, 'id' | 'name' | 'avatar'>;
    listing?: Listing;
    review?: {
        id: number;
        rating: number;
        comment?: string | null;
    } | null;
}