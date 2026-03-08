import { api } from "./api";
import type { Transaction } from "../types/transaction.types";

export const getMyTransactions = async (): Promise<Transaction[]> => {
    const res = await api.get("/transactions");
    return res.data;
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
    const res = await api.get(`/transactions/${id}`);
    return res.data;
};

export const createTransaction = async (data: {
    listingId: number;
    agreedHours: number;
}): Promise<Transaction> => {
    const payload = {
        listingId: String(data.listingId),
        agreedHours: data.agreedHours,
    };
    console.log("Transaction payload:", payload);
    try {
        const res = await api.post("/transactions", payload);
        return res.data;
    } catch (err: any) {
        console.log("Backend hiba:", err.response?.data);
        throw err;
    }
};

export const completeTransaction = async (id: number): Promise<Transaction> => {
    const res = await api.post(`/transactions/${id}/complete`);
    return res.data;
};

export const cancelTransaction = async (id: number): Promise<Transaction> => {
    const res = await api.post(`/transactions/${id}/cancel`);
    return res.data;
};