// Transaction-related types used by profile and transaction pages
export interface TransactionUser {
  id: number;
  name: string;
  avatar?: string | null;
  email?: string;
}

export interface TransactionListing {
  id: number;
  title: string;
  description: string;
  pricePerHour: number;
  imageUrl?: string | null;
  type: "OFFER" | "REQUEST";
}

export interface Transaction {
  id: number;
  client: TransactionUser;
  provider: TransactionUser;
  listing: TransactionListing;
  agreedHours: number;
  totalPrice: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
  cancelledAt?: string | null;
}
