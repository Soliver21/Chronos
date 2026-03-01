import { api } from "./api";
import type { Transaction } from "../types/transaction.types";

// Saját tranzakciók
export const getMyTransactions = async (): Promise<Transaction[]> => {
    const res = await api.get("/transactions");
    return res.data;
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
    const res = await api.get(`/transactions/${id}`);
    return res.data;
};
export const createTransaction = async (data: {
    listingId: string;
    agreedHours: number;
}): Promise<Transaction> => {
    const res = await api.post("/transactions", data);
    return res.data;
};

export const completeTransaction = async (id: number): Promise<Transaction> => {
    const res = await api.post(`/transactions/${id}/complete`);
    return res.data;
};

export const cancelTransaction = async (id: number): Promise<Transaction> => {
    const res = await api.post(`/transactions/${id}/cancel`);
    return res.data;
};