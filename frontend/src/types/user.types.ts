export interface RegisterType {
    name: string;
    email: string;
    password: string;
};

export interface LoginType {
    email: string;
    password: string;
}

export type TrustLevel = 'NEWCOMER' | 'TRUSTED' | 'VETERAN';

export interface User {
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    avatar?: string | null;
    balance: number;
    trustLevel: TrustLevel;
    averageRating?: number | null;
}

export interface Review {
    id: number;
    rating: number;
    comment?: string | null;
    userId: number;
    transactionId: number;
    user?: Pick<User, 'id' | 'name' | 'avatar'>;
}

export interface UserStats {
    totalTransactions: number;
    totalReviews: number;
    totalAmount: number;
    averageRating: number | null;
    transactions: import('./transaction.types').Transaction[];
    reviews: Review[];
}