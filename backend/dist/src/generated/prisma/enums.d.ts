export declare const TrustLevel: {
    readonly NEWCOMER: "NEWCOMER";
    readonly TRUSTED: "TRUSTED";
    readonly VETERAN: "VETERAN";
};
export type TrustLevel = (typeof TrustLevel)[keyof typeof TrustLevel];
export declare const ListingType: {
    readonly OFFER: "OFFER";
    readonly REQUEST: "REQUEST";
};
export type ListingType = (typeof ListingType)[keyof typeof ListingType];
export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
