import type { LoginType, RegisterType } from "../types/user.types";
import { api } from "../services/api.ts";

export const registUser = async (data: RegisterType) => {
    const res = await api.post('/auth/register', data);
    return res.data;
};
export const loginUser = async (data: LoginType) => {
    const res = await api.post('/auth/login', data);
    return res.data;
};