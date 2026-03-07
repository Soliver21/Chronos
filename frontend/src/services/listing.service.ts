import { api } from "./api";
import type { Listing } from "../types/listing.types";

import type { ListingFilter } from "../types/listing.types";

export const getListings = async (filters: ListingFilter = {}): Promise<Listing[]> => {
    // the backend currently only cares about categoryId but passing the whole
    // object lets us easily extend the API later and keeps the frontend code
    // consistent with the filter form.
    const res = await api.get("/listings", {
        params: filters,
    });
    return res.data;
};

export const getListingById = async (id: number): Promise<Listing> => {
    const res = await api.get(`/listings/${id}`);
    return res.data;
};

export const getMyListings = async (): Promise<Listing[]> => {
    const res = await api.get("/listings");
    return res.data;
};

// Hirdetés létrehozása
export const createListing = async (data: {
    title: string;
    description: string;
    categoryId: number;
    type: "OFFER" | "REQUEST";
    pricePerHour: number;
    estimatedHours?: number;
    imageUrl?: string;
}): Promise<Listing> => {
    const res = await api.post("/listings", data);
    return res.data;
};

// Hirdetés frissítése, egyelőre csak a szöveges mezők és ár/óra, becsült órák - kép nem, -TODO!!
export const updateListing = async (
    id: number,
    data: Partial<{
        title: string;
        description: string;
        categoryId: number;
        pricePerHour: number;
        estimatedHours: number;
    }>
): Promise<Listing> => {
    const res = await api.patch(`/listings/${id}`, data);
    return res.data;
};

// Hirdetés törlése, TESZT!
export const deleteListing = async (id: number): Promise<void> => {
    await api.delete(`/listings/${id}`);
};