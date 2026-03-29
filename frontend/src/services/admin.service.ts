import { api } from "./api";

export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};
export const getAdminUserCharts = async () => {
  const res = await api.get("/admin/charts/users");
  return res.data;
};

export const getAdminListingCharts = async () => {
  const res = await api.get("/admin/charts/listings");
  return res.data;
};

export const getAdminReviewCharts = async () => {
  const res = await api.get("/admin/charts/reviews");
  return res.data;
};

export const getAdminUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const getAdminTransactions = async () => {
  const res = await api.get("/admin/transactions");
  return res.data;
};

export const adminUpdateUser = async (id: number, data: { role?: string; trustLevel?: string; isActive?: boolean }) => {
  const res = await api.patch(`/admin/users/${id}`, data);
  return res.data;
};

export const adminDeleteListing = async (id: number) => {
  const res = await api.delete(`/admin/listings/${id}`);
  return res.data;
};

export const adminDeleteReview = async (id: number) => {
  const res = await api.delete(`/admin/reviews/${id}`);
  return res.data;
};

export const adminResolveTransaction = async (id: number, action: "COMPLETE" | "CANCEL") => {
  const res = await api.post(`/admin/transactions/${id}/resolve`, { action: action.toLowerCase() });
  return res.data;
};