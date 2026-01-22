import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewPayload>;
export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type ReviewAvgAggregateOutputType = {
    id: number | null;
    rating: number | null;
    userId: number | null;
    transactionId: number | null;
};
export type ReviewSumAggregateOutputType = {
    id: number | null;
    rating: number | null;
    userId: number | null;
    transactionId: number | null;
};
export type ReviewMinAggregateOutputType = {
    id: number | null;
    rating: number | null;
    comment: string | null;
    userId: number | null;
    transactionId: number | null;
};
export type ReviewMaxAggregateOutputType = {
    id: number | null;
    rating: number | null;
    comment: string | null;
    userId: number | null;
    transactionId: number | null;
};
export type ReviewCountAggregateOutputType = {
    id: number;
    rating: number;
    comment: number;
    userId: number;
    transactionId: number;
    _all: number;
};
export type ReviewAvgAggregateInputType = {
    id?: true;
    rating?: true;
    userId?: true;
    transactionId?: true;
};
export type ReviewSumAggregateInputType = {
    id?: true;
    rating?: true;
    userId?: true;
    transactionId?: true;
};
export type ReviewMinAggregateInputType = {
    id?: true;
    rating?: true;
    comment?: true;
    userId?: true;
    transactionId?: true;
};
export type ReviewMaxAggregateInputType = {
    id?: true;
    rating?: true;
    comment?: true;
    userId?: true;
    transactionId?: true;
};
export type ReviewCountAggregateInputType = {
    id?: true;
    rating?: true;
    comment?: true;
    userId?: true;
    transactionId?: true;
    _all?: true;
};
export type ReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewCountAggregateInputType;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReview[P]> : Prisma.GetScalarType<T[P], AggregateReview[P]>;
};
export type ReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithAggregationInput | Prisma.ReviewOrderByWithAggregationInput[];
    by: Prisma.ReviewScalarFieldEnum[] | Prisma.ReviewScalarFieldEnum;
    having?: Prisma.ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type ReviewGroupByOutputType = {
    id: number;
    rating: number;
    comment: string | null;
    userId: number;
    transactionId: number;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]>;
}>>;
export type ReviewWhereInput = {
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    id?: Prisma.IntFilter<"Review"> | number;
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    userId?: Prisma.IntFilter<"Review"> | number;
    transactionId?: Prisma.IntFilter<"Review"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transaction?: Prisma.XOR<Prisma.TransactionScalarRelationFilter, Prisma.TransactionWhereInput>;
};
export type ReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    transaction?: Prisma.TransactionOrderByWithRelationInput;
    _relevance?: Prisma.ReviewOrderByRelevanceInput;
};
export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    transactionId?: number;
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    userId?: Prisma.IntFilter<"Review"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transaction?: Prisma.XOR<Prisma.TransactionScalarRelationFilter, Prisma.TransactionWhereInput>;
}, "id" | "transactionId">;
export type ReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    _count?: Prisma.ReviewCountOrderByAggregateInput;
    _avg?: Prisma.ReviewAvgOrderByAggregateInput;
    _max?: Prisma.ReviewMaxOrderByAggregateInput;
    _min?: Prisma.ReviewMinOrderByAggregateInput;
    _sum?: Prisma.ReviewSumOrderByAggregateInput;
};
export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    rating?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    comment?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    userId?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    transactionId?: Prisma.IntWithAggregatesFilter<"Review"> | number;
};
export type ReviewCreateInput = {
    rating: number;
    comment?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    transaction: Prisma.TransactionCreateNestedOneWithoutReviewInput;
};
export type ReviewUncheckedCreateInput = {
    id?: number;
    rating: number;
    comment?: string | null;
    userId: number;
    transactionId: number;
};
export type ReviewUpdateInput = {
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    transaction?: Prisma.TransactionUpdateOneRequiredWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    transactionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ReviewCreateManyInput = {
    id?: number;
    rating: number;
    comment?: string | null;
    userId: number;
    transactionId: number;
};
export type ReviewUpdateManyMutationInput = {
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ReviewUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    transactionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ReviewListRelationFilter = {
    every?: Prisma.ReviewWhereInput;
    some?: Prisma.ReviewWhereInput;
    none?: Prisma.ReviewWhereInput;
};
export type ReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewNullableScalarRelationFilter = {
    is?: Prisma.ReviewWhereInput | null;
    isNot?: Prisma.ReviewWhereInput | null;
};
export type ReviewOrderByRelevanceInput = {
    fields: Prisma.ReviewOrderByRelevanceFieldEnum | Prisma.ReviewOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
};
export type ReviewAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
};
export type ReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
};
export type ReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
};
export type ReviewSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
};
export type ReviewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutUserInput | Prisma.ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput> | Prisma.ReviewCreateWithoutUserInput[] | Prisma.ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutUserInput | Prisma.ReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ReviewCreateManyUserInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutUserInput | Prisma.ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedOneWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTransactionInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTransactionInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTransactionInput;
    upsert?: Prisma.ReviewUpsertWithoutTransactionInput;
    disconnect?: Prisma.ReviewWhereInput | boolean;
    delete?: Prisma.ReviewWhereInput | boolean;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutTransactionInput, Prisma.ReviewUpdateWithoutTransactionInput>, Prisma.ReviewUncheckedUpdateWithoutTransactionInput>;
};
export type ReviewUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutTransactionInput;
    upsert?: Prisma.ReviewUpsertWithoutTransactionInput;
    disconnect?: Prisma.ReviewWhereInput | boolean;
    delete?: Prisma.ReviewWhereInput | boolean;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutTransactionInput, Prisma.ReviewUpdateWithoutTransactionInput>, Prisma.ReviewUncheckedUpdateWithoutTransactionInput>;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type ReviewCreateWithoutUserInput = {
    rating: number;
    comment?: string | null;
    transaction: Prisma.TransactionCreateNestedOneWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutUserInput = {
    id?: number;
    rating: number;
    comment?: string | null;
    transactionId: number;
};
export type ReviewCreateOrConnectWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput>;
};
export type ReviewCreateManyUserInputEnvelope = {
    data: Prisma.ReviewCreateManyUserInput | Prisma.ReviewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutUserInput, Prisma.ReviewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutUserInput, Prisma.ReviewUncheckedCreateWithoutUserInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutUserInput, Prisma.ReviewUncheckedUpdateWithoutUserInput>;
};
export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutUserInput>;
};
export type ReviewScalarWhereInput = {
    AND?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    OR?: Prisma.ReviewScalarWhereInput[];
    NOT?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    id?: Prisma.IntFilter<"Review"> | number;
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    userId?: Prisma.IntFilter<"Review"> | number;
    transactionId?: Prisma.IntFilter<"Review"> | number;
};
export type ReviewCreateWithoutTransactionInput = {
    rating: number;
    comment?: string | null;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
};
export type ReviewUncheckedCreateWithoutTransactionInput = {
    id?: number;
    rating: number;
    comment?: string | null;
    userId: number;
};
export type ReviewCreateOrConnectWithoutTransactionInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
};
export type ReviewUpsertWithoutTransactionInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutTransactionInput, Prisma.ReviewUncheckedUpdateWithoutTransactionInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutTransactionInput, Prisma.ReviewUncheckedCreateWithoutTransactionInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutTransactionInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutTransactionInput, Prisma.ReviewUncheckedUpdateWithoutTransactionInput>;
};
export type ReviewUpdateWithoutTransactionInput = {
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
};
export type ReviewUncheckedUpdateWithoutTransactionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ReviewCreateManyUserInput = {
    id?: number;
    rating: number;
    comment?: string | null;
    transactionId: number;
};
export type ReviewUpdateWithoutUserInput = {
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transaction?: Prisma.TransactionUpdateOneRequiredWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transactionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transactionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rating?: boolean;
    comment?: boolean;
    userId?: boolean;
    transactionId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectScalar = {
    id?: boolean;
    rating?: boolean;
    comment?: boolean;
    userId?: boolean;
    transactionId?: boolean;
};
export type ReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "rating" | "comment" | "userId" | "transactionId", ExtArgs["result"]["review"]>;
export type ReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
};
export type $ReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Review";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        transaction: Prisma.$TransactionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        rating: number;
        comment: string | null;
        userId: number;
        transactionId: number;
    }, ExtArgs["result"]["review"]>;
    composites: {};
};
export type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewPayload, S>;
export type ReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewCountAggregateInputType | true;
};
export interface ReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Review'];
        meta: {
            name: 'Review';
        };
    };
    findUnique<T extends ReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewCreateArgs>(args: Prisma.SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ReviewDeleteArgs>(args: Prisma.SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewUpdateArgs>(args: Prisma.SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ReviewUpsertArgs>(args: Prisma.SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewCountArgs>(args?: Prisma.Subset<T, ReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewCountAggregateOutputType> : number>;
    aggregate<T extends ReviewAggregateArgs>(args: Prisma.Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>;
    groupBy<T extends ReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewFieldRefs;
}
export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transaction<T extends Prisma.TransactionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TransactionDefaultArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewFieldRefs {
    readonly id: Prisma.FieldRef<"Review", 'Int'>;
    readonly rating: Prisma.FieldRef<"Review", 'Int'>;
    readonly comment: Prisma.FieldRef<"Review", 'String'>;
    readonly userId: Prisma.FieldRef<"Review", 'Int'>;
    readonly transactionId: Prisma.FieldRef<"Review", 'Int'>;
}
export type ReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
};
export type ReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
};
export type ReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
};
export {};
