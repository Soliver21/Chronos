import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type TransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$TransactionPayload>;
export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
export type TransactionAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    listingId: number | null;
};
export type TransactionSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    listingId: number | null;
};
export type TransactionMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    listingId: number | null;
    status: $Enums.TransactionStatus | null;
};
export type TransactionMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    listingId: number | null;
    status: $Enums.TransactionStatus | null;
};
export type TransactionCountAggregateOutputType = {
    id: number;
    userId: number;
    listingId: number;
    status: number;
    _all: number;
};
export type TransactionAvgAggregateInputType = {
    id?: true;
    userId?: true;
    listingId?: true;
};
export type TransactionSumAggregateInputType = {
    id?: true;
    userId?: true;
    listingId?: true;
};
export type TransactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    listingId?: true;
    status?: true;
};
export type TransactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    listingId?: true;
    status?: true;
};
export type TransactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    listingId?: true;
    status?: true;
    _all?: true;
};
export type TransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TransactionCountAggregateInputType;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransaction[P]> : Prisma.GetScalarType<T[P], AggregateTransaction[P]>;
};
export type TransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithAggregationInput | Prisma.TransactionOrderByWithAggregationInput[];
    by: Prisma.TransactionScalarFieldEnum[] | Prisma.TransactionScalarFieldEnum;
    having?: Prisma.TransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionCountAggregateInputType | true;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type TransactionGroupByOutputType = {
    id: number;
    userId: number;
    listingId: number;
    status: $Enums.TransactionStatus;
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]>;
}>>;
export type TransactionWhereInput = {
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    id?: Prisma.IntFilter<"Transaction"> | number;
    userId?: Prisma.IntFilter<"Transaction"> | number;
    listingId?: Prisma.IntFilter<"Transaction"> | number;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    listing?: Prisma.XOR<Prisma.ListingScalarRelationFilter, Prisma.ListingWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewNullableScalarRelationFilter, Prisma.ReviewWhereInput> | null;
};
export type TransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    listing?: Prisma.ListingOrderByWithRelationInput;
    review?: Prisma.ReviewOrderByWithRelationInput;
};
export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    userId?: Prisma.IntFilter<"Transaction"> | number;
    listingId?: Prisma.IntFilter<"Transaction"> | number;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    listing?: Prisma.XOR<Prisma.ListingScalarRelationFilter, Prisma.ListingWhereInput>;
    review?: Prisma.XOR<Prisma.ReviewNullableScalarRelationFilter, Prisma.ReviewWhereInput> | null;
}, "id">;
export type TransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.TransactionCountOrderByAggregateInput;
    _avg?: Prisma.TransactionAvgOrderByAggregateInput;
    _max?: Prisma.TransactionMaxOrderByAggregateInput;
    _min?: Prisma.TransactionMinOrderByAggregateInput;
    _sum?: Prisma.TransactionSumOrderByAggregateInput;
};
export type TransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.TransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Transaction"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Transaction"> | number;
    listingId?: Prisma.IntWithAggregatesFilter<"Transaction"> | number;
    status?: Prisma.EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus;
};
export type TransactionCreateInput = {
    status: $Enums.TransactionStatus;
    user: Prisma.UserCreateNestedOneWithoutTransactionsInput;
    listing: Prisma.ListingCreateNestedOneWithoutTransactionsInput;
    review?: Prisma.ReviewCreateNestedOneWithoutTransactionInput;
};
export type TransactionUncheckedCreateInput = {
    id?: number;
    userId: number;
    listingId: number;
    status: $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedCreateNestedOneWithoutTransactionInput;
};
export type TransactionUpdateInput = {
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    user?: Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput;
    listing?: Prisma.ListingUpdateOneRequiredWithoutTransactionsNestedInput;
    review?: Prisma.ReviewUpdateOneWithoutTransactionNestedInput;
};
export type TransactionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    listingId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedUpdateOneWithoutTransactionNestedInput;
};
export type TransactionCreateManyInput = {
    id?: number;
    userId: number;
    listingId: number;
    status: $Enums.TransactionStatus;
};
export type TransactionUpdateManyMutationInput = {
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
};
export type TransactionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    listingId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
};
export type TransactionListRelationFilter = {
    every?: Prisma.TransactionWhereInput;
    some?: Prisma.TransactionWhereInput;
    none?: Prisma.TransactionWhereInput;
};
export type TransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TransactionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
};
export type TransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TransactionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    listingId?: Prisma.SortOrder;
};
export type TransactionScalarRelationFilter = {
    is?: Prisma.TransactionWhereInput;
    isNot?: Prisma.TransactionWhereInput;
};
export type TransactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutUserInput | Prisma.TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutUserInput | Prisma.TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionCreateNestedManyWithoutListingInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput> | Prisma.TransactionCreateWithoutListingInput[] | Prisma.TransactionUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutListingInput | Prisma.TransactionCreateOrConnectWithoutListingInput[];
    createMany?: Prisma.TransactionCreateManyListingInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUncheckedCreateNestedManyWithoutListingInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput> | Prisma.TransactionCreateWithoutListingInput[] | Prisma.TransactionUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutListingInput | Prisma.TransactionCreateOrConnectWithoutListingInput[];
    createMany?: Prisma.TransactionCreateManyListingInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUpdateManyWithoutListingNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput> | Prisma.TransactionCreateWithoutListingInput[] | Prisma.TransactionUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutListingInput | Prisma.TransactionCreateOrConnectWithoutListingInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutListingInput | Prisma.TransactionUpsertWithWhereUniqueWithoutListingInput[];
    createMany?: Prisma.TransactionCreateManyListingInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutListingInput | Prisma.TransactionUpdateWithWhereUniqueWithoutListingInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutListingInput | Prisma.TransactionUpdateManyWithWhereWithoutListingInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionUncheckedUpdateManyWithoutListingNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput> | Prisma.TransactionCreateWithoutListingInput[] | Prisma.TransactionUncheckedCreateWithoutListingInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutListingInput | Prisma.TransactionCreateOrConnectWithoutListingInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutListingInput | Prisma.TransactionUpsertWithWhereUniqueWithoutListingInput[];
    createMany?: Prisma.TransactionCreateManyListingInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutListingInput | Prisma.TransactionUpdateWithWhereUniqueWithoutListingInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutListingInput | Prisma.TransactionUpdateManyWithWhereWithoutListingInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus;
};
export type TransactionCreateNestedOneWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutReviewInput, Prisma.TransactionUncheckedCreateWithoutReviewInput>;
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutReviewInput;
    connect?: Prisma.TransactionWhereUniqueInput;
};
export type TransactionUpdateOneRequiredWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutReviewInput, Prisma.TransactionUncheckedCreateWithoutReviewInput>;
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutReviewInput;
    upsert?: Prisma.TransactionUpsertWithoutReviewInput;
    connect?: Prisma.TransactionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TransactionUpdateToOneWithWhereWithoutReviewInput, Prisma.TransactionUpdateWithoutReviewInput>, Prisma.TransactionUncheckedUpdateWithoutReviewInput>;
};
export type TransactionCreateWithoutUserInput = {
    status: $Enums.TransactionStatus;
    listing: Prisma.ListingCreateNestedOneWithoutTransactionsInput;
    review?: Prisma.ReviewCreateNestedOneWithoutTransactionInput;
};
export type TransactionUncheckedCreateWithoutUserInput = {
    id?: number;
    listingId: number;
    status: $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedCreateNestedOneWithoutTransactionInput;
};
export type TransactionCreateOrConnectWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput>;
};
export type TransactionCreateManyUserInputEnvelope = {
    data: Prisma.TransactionCreateManyUserInput | Prisma.TransactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutUserInput, Prisma.TransactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput>;
};
export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutUserInput, Prisma.TransactionUncheckedUpdateWithoutUserInput>;
};
export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyWithoutUserInput>;
};
export type TransactionScalarWhereInput = {
    AND?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    OR?: Prisma.TransactionScalarWhereInput[];
    NOT?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    id?: Prisma.IntFilter<"Transaction"> | number;
    userId?: Prisma.IntFilter<"Transaction"> | number;
    listingId?: Prisma.IntFilter<"Transaction"> | number;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
};
export type TransactionCreateWithoutListingInput = {
    status: $Enums.TransactionStatus;
    user: Prisma.UserCreateNestedOneWithoutTransactionsInput;
    review?: Prisma.ReviewCreateNestedOneWithoutTransactionInput;
};
export type TransactionUncheckedCreateWithoutListingInput = {
    id?: number;
    userId: number;
    status: $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedCreateNestedOneWithoutTransactionInput;
};
export type TransactionCreateOrConnectWithoutListingInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput>;
};
export type TransactionCreateManyListingInputEnvelope = {
    data: Prisma.TransactionCreateManyListingInput | Prisma.TransactionCreateManyListingInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpsertWithWhereUniqueWithoutListingInput = {
    where: Prisma.TransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutListingInput, Prisma.TransactionUncheckedUpdateWithoutListingInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutListingInput, Prisma.TransactionUncheckedCreateWithoutListingInput>;
};
export type TransactionUpdateWithWhereUniqueWithoutListingInput = {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutListingInput, Prisma.TransactionUncheckedUpdateWithoutListingInput>;
};
export type TransactionUpdateManyWithWhereWithoutListingInput = {
    where: Prisma.TransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyWithoutListingInput>;
};
export type TransactionCreateWithoutReviewInput = {
    status: $Enums.TransactionStatus;
    user: Prisma.UserCreateNestedOneWithoutTransactionsInput;
    listing: Prisma.ListingCreateNestedOneWithoutTransactionsInput;
};
export type TransactionUncheckedCreateWithoutReviewInput = {
    id?: number;
    userId: number;
    listingId: number;
    status: $Enums.TransactionStatus;
};
export type TransactionCreateOrConnectWithoutReviewInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutReviewInput, Prisma.TransactionUncheckedCreateWithoutReviewInput>;
};
export type TransactionUpsertWithoutReviewInput = {
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutReviewInput, Prisma.TransactionUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutReviewInput, Prisma.TransactionUncheckedCreateWithoutReviewInput>;
    where?: Prisma.TransactionWhereInput;
};
export type TransactionUpdateToOneWithWhereWithoutReviewInput = {
    where?: Prisma.TransactionWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutReviewInput, Prisma.TransactionUncheckedUpdateWithoutReviewInput>;
};
export type TransactionUpdateWithoutReviewInput = {
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    user?: Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput;
    listing?: Prisma.ListingUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type TransactionUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    listingId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
};
export type TransactionCreateManyUserInput = {
    id?: number;
    listingId: number;
    status: $Enums.TransactionStatus;
};
export type TransactionUpdateWithoutUserInput = {
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    listing?: Prisma.ListingUpdateOneRequiredWithoutTransactionsNestedInput;
    review?: Prisma.ReviewUpdateOneWithoutTransactionNestedInput;
};
export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    listingId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedUpdateOneWithoutTransactionNestedInput;
};
export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    listingId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
};
export type TransactionCreateManyListingInput = {
    id?: number;
    userId: number;
    status: $Enums.TransactionStatus;
};
export type TransactionUpdateWithoutListingInput = {
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    user?: Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput;
    review?: Prisma.ReviewUpdateOneWithoutTransactionNestedInput;
};
export type TransactionUncheckedUpdateWithoutListingInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    review?: Prisma.ReviewUncheckedUpdateOneWithoutTransactionNestedInput;
};
export type TransactionUncheckedUpdateManyWithoutListingInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
};
export type TransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    listingId?: boolean;
    status?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Transaction$reviewArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    listingId?: boolean;
    status?: boolean;
};
export type TransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "listingId" | "status", ExtArgs["result"]["transaction"]>;
export type TransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    listing?: boolean | Prisma.ListingDefaultArgs<ExtArgs>;
    review?: boolean | Prisma.Transaction$reviewArgs<ExtArgs>;
};
export type $TransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Transaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        listing: Prisma.$ListingPayload<ExtArgs>;
        review: Prisma.$ReviewPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        listingId: number;
        status: $Enums.TransactionStatus;
    }, ExtArgs["result"]["transaction"]>;
    composites: {};
};
export type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TransactionPayload, S>;
export type TransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TransactionCountAggregateInputType | true;
};
export interface TransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Transaction'];
        meta: {
            name: 'Transaction';
        };
    };
    findUnique<T extends TransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TransactionFindManyArgs>(args?: Prisma.SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TransactionCreateArgs>(args: Prisma.SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TransactionDeleteArgs>(args: Prisma.SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TransactionUpdateArgs>(args: Prisma.SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TransactionUpsertArgs>(args: Prisma.SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TransactionCountArgs>(args?: Prisma.Subset<T, TransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TransactionCountAggregateOutputType> : number>;
    aggregate<T extends TransactionAggregateArgs>(args: Prisma.Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>;
    groupBy<T extends TransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: TransactionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TransactionFieldRefs;
}
export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    listing<T extends Prisma.ListingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ListingDefaultArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    review<T extends Prisma.Transaction$reviewArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Transaction$reviewArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TransactionFieldRefs {
    readonly id: Prisma.FieldRef<"Transaction", 'Int'>;
    readonly userId: Prisma.FieldRef<"Transaction", 'Int'>;
    readonly listingId: Prisma.FieldRef<"Transaction", 'Int'>;
    readonly status: Prisma.FieldRef<"Transaction", 'TransactionStatus'>;
}
export type TransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
};
export type TransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TransactionCreateManyInput | Prisma.TransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyInput>;
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type TransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
};
export type TransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type Transaction$reviewArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
};
export type TransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
};
export {};
