import { api } from "./api";

export interface WebsiteReview {
  id: number;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string | null;
  };
}

export const createWebsiteReview = async (data: {
  rating: number;
  comment?: string;
}): Promise<WebsiteReview> => {
  const res = await api.post("/reviews/service", data);
  return res.data;
};

export const getLatestWebsiteReviews = async (limit = 6): Promise<WebsiteReview[]> => {
  const res = await api.get(`/reviews/service/latest/${limit}`);
  return res.data;
};