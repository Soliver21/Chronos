import { api } from "./api";
import type { Review } from "../types/user.types";

export interface UserReview {
  id: number;
  rating: number;
  comment?: string | null;
  transaction: {
    listing?: { title: string } | null;
  };
}

export const getUserReviews = async (userId: number): Promise<UserReview[]> => {
  const res = await api.get(`/reviews/user/${userId}`);
  return res.data;
};

export const createReview = async (data: {
  transactionId: number;
  rating: number;
  comment?: string;
}): Promise<Review> => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const createWebsiteReview = async (data: {
  rating: number;
  comment?: string;
}) => {
  const res = await api.post("/reviews/service", data);
  return res.data;
};

export const getLatestServiceReviews = async (limit = 10) => {
  const res = await api.get(`/reviews/service/latest/${limit}`);
  return res.data;
};