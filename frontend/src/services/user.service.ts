import { api } from "./api";
import type { User, UserStats } from "../types/user.types";

export const getMyProfile = async (): Promise<User> => {
    const res = await api.get("/users/me");
    return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const getUserStats = async (id: number): Promise<UserStats> => {
    const res = await api.get(`/users/${id}/stats`);
    return res.data;
};

export const updateMyProfile = async (
    data: Partial<Pick<User, "name" | "bio" | "avatar">>
): Promise<User> => {
    const res = await api.patch("/users/me", data);
    return res.data;
};
//ai cucc, nem értem még - Olivér
export const uploadAvatar = async (
    file: File
): Promise<{ url: string; absoluteUrl: string; user: User }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};