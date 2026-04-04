import { api } from "./api";
import type { User, UserStats } from "../types/user.types";

// Saját profil lekérése
export const getMyProfile = async (): Promise<User> => {
    const res = await api.get("/users/me");
    return res.data;
};

// Felhasználó lekérése ID alapján
export const getUserById = async (id: number): Promise<User> => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

// Felhasználó statisztikái (értékelések, átlag stb.)
export const getUserStats = async (id: number): Promise<UserStats> => {
    const res = await api.get(`/users/${id}/stats`);
    return res.data;
};

// Profil adatok mentése
export const updateMyProfile = async (
    data: Partial<Pick<User, "name" | "bio" | "avatar">>
): Promise<User> => {
    const res = await api.patch("/users/me", data);
    return res.data;
};

// Profilkép feltöltése - Olivér: ez az, ami a /upload/avatar endpointot hívja
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

// Kategóriák lekérése (hirdetés szerkesztő modalhoz)
export const getCategories = async (): Promise<{ id: number; name: string; slug: string }[]> => {
    const res = await api.get("/categories");
    return res.data;
};
