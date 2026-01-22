import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ListingModel = runtime.Types.Result.DefaultSelection<Prisma.$ListingPayload>;
export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null;
    _avg: ListingAvgAggregateOutputType | null;
    _sum: ListingSumAggregateOutputType | null;
    _min: ListingMinAggregateOutputType | null;
    _max: ListingMaxAggregateOutputType | null;
};
export type ListingAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type ListingSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type ListingMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    category: string | null;
    type: $Enums.ListingType | null;
    userId: number | null;
};
export type ListingMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    category: string | null;
    type: $Enums.ListingType | null;
    userId: number | null;
};
export type ListingCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    category: number;
    type: number;
    userId: number;
    _all: number;
};
export type ListingAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type ListingSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type ListingMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    category?: true;
    type?: true;
    userId?: true;
};
export type ListingMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    category?: true;
    type?: true;
    userId?: true;
};
export type ListingCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    category?: true;
    type?: true;
    userId?: true;
    _all?: true;
};
export type ListingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ListingCountAggregateInputType;
    _avg?: ListingAvgAggregateInputType;
    _sum?: ListingSumAggregateInputType;
    _min?: ListingMinAggregateInputType;
    _max?: ListingMaxAggregateInputType;
};
export type GetListingAggregateType<T extends ListingAggregateArgs> = {
    [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateListing[P]> : Prisma.GetScalarType<T[P], AggregateListing[P]>;
};
export type ListingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithAggregationInput | Prisma.ListingOrderByWithAggregationInput[];
    by: Prisma.ListingScalarFieldEnum[] | Prisma.ListingScalarFieldEnum;
    having?: Prisma.ListingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ListingCountAggregateInputType | true;
    _avg?: ListingAvgAggregateInputType;
    _sum?: ListingSumAggregateInputType;
    _min?: ListingMinAggregateInputType;
    _max?: ListingMaxAggregateInputType;
};
export type ListingGroupByOutputType = {
    id: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    userId: number;
    _count: ListingCountAggregateOutputType | null;
    _avg: ListingAvgAggregateOutputType | null;
    _sum: ListingSumAggregateOutputType | null;
    _min: ListingMinAggregateOutputType | null;
    _max: ListingMaxAggregateOutputType | null;
};
type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ListingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ListingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ListingGroupByOutputType[P]>;
}>>;
export type ListingWhereInput = {
    AND?: Prisma.ListingWhereInput | Prisma.ListingWhereInput[];
    OR?: Prisma.ListingWhereInput[];
    NOT?: Prisma.ListingWhereInput | Prisma.ListingWhereInput[];
    id?: Prisma.IntFilter<"Listing"> | number;
    title?: Prisma.StringFilter<"Listing"> | string;
    description?: Prisma.StringFilter<"Listing"> | string;
    category?: Prisma.StringFilter<"Listing"> | string;
    type?: Prisma.EnumListingTypeFilter<"Listing"> | $Enums.ListingType;
    userId?: Prisma.IntFilter<"Listing"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type ListingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
    _relevance?: Prisma.ListingOrderByRelevanceInput;
};
export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ListingWhereInput | Prisma.ListingWhereInput[];
    OR?: Prisma.ListingWhereInput[];
    NOT?: Prisma.ListingWhereInput | Prisma.ListingWhereInput[];
    title?: Prisma.StringFilter<"Listing"> | string;
    description?: Prisma.StringFilter<"Listing"> | string;
    category?: Prisma.StringFilter<"Listing"> | string;
    type?: Prisma.EnumListingTypeFilter<"Listing"> | $Enums.ListingType;
    userId?: Prisma.IntFilter<"Listing"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type ListingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.ListingCountOrderByAggregateInput;
    _avg?: Prisma.ListingAvgOrderByAggregateInput;
    _max?: Prisma.ListingMaxOrderByAggregateInput;
    _min?: Prisma.ListingMinOrderByAggregateInput;
    _sum?: Prisma.ListingSumOrderByAggregateInput;
};
export type ListingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ListingScalarWhereWithAggregatesInput | Prisma.ListingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ListingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ListingScalarWhereWithAggregatesInput | Prisma.ListingScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Listing"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Listing"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Listing"> | string;
    category?: Prisma.StringWithAggregatesFilter<"Listing"> | string;
    type?: Prisma.EnumListingTypeWithAggregatesFilter<"Listing"> | $Enums.ListingType;
    userId?: Prisma.IntWithAggregatesFilter<"Listing"> | number;
};
export type ListingCreateInput = {
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    user: Prisma.UserCreateNestedOneWithoutListingsInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutListingInput;
};
export type ListingUncheckedCreateInput = {
    id?: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    userId: number;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutListingInput;
};
export type ListingUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    user?: Prisma.UserUpdateOneRequiredWithoutListingsNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutListingNestedInput;
};
export type ListingUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutListingNestedInput;
};
export type ListingCreateManyInput = {
    id?: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    userId: number;
};
export type ListingUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
};
export type ListingUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ListingListRelationFilter = {
    every?: Prisma.ListingWhereInput;
    some?: Prisma.ListingWhereInput;
    none?: Prisma.ListingWhereInput;
};
export type ListingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ListingOrderByRelevanceInput = {
    fields: Prisma.ListingOrderByRelevanceFieldEnum | Prisma.ListingOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ListingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ListingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ListingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ListingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ListingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type ListingScalarRelationFilter = {
    is?: Prisma.ListingWhereInput;
    isNot?: Prisma.ListingWhereInput;
};
export type ListingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput> | Prisma.ListingCreateWithoutUserInput[] | Prisma.ListingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutUserInput | Prisma.ListingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ListingCreateManyUserInputEnvelope;
    connect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
};
export type ListingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput> | Prisma.ListingCreateWithoutUserInput[] | Prisma.ListingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutUserInput | Prisma.ListingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ListingCreateManyUserInputEnvelope;
    connect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
};
export type ListingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput> | Prisma.ListingCreateWithoutUserInput[] | Prisma.ListingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutUserInput | Prisma.ListingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ListingUpsertWithWhereUniqueWithoutUserInput | Prisma.ListingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ListingCreateManyUserInputEnvelope;
    set?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    disconnect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    delete?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    connect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    update?: Prisma.ListingUpdateWithWhereUniqueWithoutUserInput | Prisma.ListingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ListingUpdateManyWithWhereWithoutUserInput | Prisma.ListingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ListingScalarWhereInput | Prisma.ListingScalarWhereInput[];
};
export type ListingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput> | Prisma.ListingCreateWithoutUserInput[] | Prisma.ListingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutUserInput | Prisma.ListingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ListingUpsertWithWhereUniqueWithoutUserInput | Prisma.ListingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ListingCreateManyUserInputEnvelope;
    set?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    disconnect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    delete?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    connect?: Prisma.ListingWhereUniqueInput | Prisma.ListingWhereUniqueInput[];
    update?: Prisma.ListingUpdateWithWhereUniqueWithoutUserInput | Prisma.ListingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ListingUpdateManyWithWhereWithoutUserInput | Prisma.ListingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ListingScalarWhereInput | Prisma.ListingScalarWhereInput[];
};
export type EnumListingTypeFieldUpdateOperationsInput = {
    set?: $Enums.ListingType;
};
export type ListingCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutTransactionsInput, Prisma.ListingUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.ListingWhereUniqueInput;
};
export type ListingUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.ListingCreateWithoutTransactionsInput, Prisma.ListingUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.ListingCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.ListingUpsertWithoutTransactionsInput;
    connect?: Prisma.ListingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ListingUpdateToOneWithWhereWithoutTransactionsInput, Prisma.ListingUpdateWithoutTransactionsInput>, Prisma.ListingUncheckedUpdateWithoutTransactionsInput>;
};
export type ListingCreateWithoutUserInput = {
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    transactions?: Prisma.TransactionCreateNestedManyWithoutListingInput;
};
export type ListingUncheckedCreateWithoutUserInput = {
    id?: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutListingInput;
};
export type ListingCreateOrConnectWithoutUserInput = {
    where: Prisma.ListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput>;
};
export type ListingCreateManyUserInputEnvelope = {
    data: Prisma.ListingCreateManyUserInput | Prisma.ListingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ListingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ListingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ListingUpdateWithoutUserInput, Prisma.ListingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ListingCreateWithoutUserInput, Prisma.ListingUncheckedCreateWithoutUserInput>;
};
export type ListingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ListingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ListingUpdateWithoutUserInput, Prisma.ListingUncheckedUpdateWithoutUserInput>;
};
export type ListingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ListingScalarWhereInput;
    data: Prisma.XOR<Prisma.ListingUpdateManyMutationInput, Prisma.ListingUncheckedUpdateManyWithoutUserInput>;
};
export type ListingScalarWhereInput = {
    AND?: Prisma.ListingScalarWhereInput | Prisma.ListingScalarWhereInput[];
    OR?: Prisma.ListingScalarWhereInput[];
    NOT?: Prisma.ListingScalarWhereInput | Prisma.ListingScalarWhereInput[];
    id?: Prisma.IntFilter<"Listing"> | number;
    title?: Prisma.StringFilter<"Listing"> | string;
    description?: Prisma.StringFilter<"Listing"> | string;
    category?: Prisma.StringFilter<"Listing"> | string;
    type?: Prisma.EnumListingTypeFilter<"Listing"> | $Enums.ListingType;
    userId?: Prisma.IntFilter<"Listing"> | number;
};
export type ListingCreateWithoutTransactionsInput = {
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    user: Prisma.UserCreateNestedOneWithoutListingsInput;
};
export type ListingUncheckedCreateWithoutTransactionsInput = {
    id?: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
    userId: number;
};
export type ListingCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.ListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListingCreateWithoutTransactionsInput, Prisma.ListingUncheckedCreateWithoutTransactionsInput>;
};
export type ListingUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.ListingUpdateWithoutTransactionsInput, Prisma.ListingUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.ListingCreateWithoutTransactionsInput, Prisma.ListingUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.ListingWhereInput;
};
export type ListingUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.ListingWhereInput;
    data: Prisma.XOR<Prisma.ListingUpdateWithoutTransactionsInput, Prisma.ListingUncheckedUpdateWithoutTransactionsInput>;
};
export type ListingUpdateWithoutTransactionsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    user?: Prisma.UserUpdateOneRequiredWithoutListingsNestedInput;
};
export type ListingUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ListingCreateManyUserInput = {
    id?: number;
    title: string;
    description: string;
    category: string;
    type: $Enums.ListingType;
};
export type ListingUpdateWithoutUserInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    transactions?: Prisma.TransactionUpdateManyWithoutListingNestedInput;
};
export type ListingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutListingNestedInput;
};
export type ListingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType;
};
export type ListingCountOutputType = {
    transactions: number;
};
export type ListingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | ListingCountOutputTypeCountTransactionsArgs;
};
export type ListingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingCountOutputTypeSelect<ExtArgs> | null;
};
export type ListingCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type ListingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    type?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Listing$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ListingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["listing"]>;
export type ListingSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    type?: boolean;
    userId?: boolean;
};
export type ListingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "category" | "type" | "userId", ExtArgs["result"]["listing"]>;
export type ListingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Listing$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ListingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $ListingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Listing";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        description: string;
        category: string;
        type: $Enums.ListingType;
        userId: number;
    }, ExtArgs["result"]["listing"]>;
    composites: {};
};
export type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ListingPayload, S>;
export type ListingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ListingCountAggregateInputType | true;
};
export interface ListingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Listing'];
        meta: {
            name: 'Listing';
        };
    };
    findUnique<T extends ListingFindUniqueArgs>(args: Prisma.SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ListingFindFirstArgs>(args?: Prisma.SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ListingFindManyArgs>(args?: Prisma.SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ListingCreateArgs>(args: Prisma.SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ListingCreateManyArgs>(args?: Prisma.SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ListingDeleteArgs>(args: Prisma.SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ListingUpdateArgs>(args: Prisma.SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ListingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ListingUpdateManyArgs>(args: Prisma.SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ListingUpsertArgs>(args: Prisma.SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma.Prisma__ListingClient<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ListingCountArgs>(args?: Prisma.Subset<T, ListingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ListingCountAggregateOutputType> : number>;
    aggregate<T extends ListingAggregateArgs>(args: Prisma.Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>;
    groupBy<T extends ListingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ListingGroupByArgs['orderBy'];
    } : {
        orderBy?: ListingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ListingFieldRefs;
}
export interface Prisma__ListingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Listing$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Listing$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ListingFieldRefs {
    readonly id: Prisma.FieldRef<"Listing", 'Int'>;
    readonly title: Prisma.FieldRef<"Listing", 'String'>;
    readonly description: Prisma.FieldRef<"Listing", 'String'>;
    readonly category: Prisma.FieldRef<"Listing", 'String'>;
    readonly type: Prisma.FieldRef<"Listing", 'ListingType'>;
    readonly userId: Prisma.FieldRef<"Listing", 'Int'>;
}
export type ListingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where: Prisma.ListingWhereUniqueInput;
};
export type ListingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where: Prisma.ListingWhereUniqueInput;
};
export type ListingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListingScalarFieldEnum | Prisma.ListingScalarFieldEnum[];
};
export type ListingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListingScalarFieldEnum | Prisma.ListingScalarFieldEnum[];
};
export type ListingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListingScalarFieldEnum | Prisma.ListingScalarFieldEnum[];
};
export type ListingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ListingCreateInput, Prisma.ListingUncheckedCreateInput>;
};
export type ListingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ListingCreateManyInput | Prisma.ListingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ListingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ListingUpdateInput, Prisma.ListingUncheckedUpdateInput>;
    where: Prisma.ListingWhereUniqueInput;
};
export type ListingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ListingUpdateManyMutationInput, Prisma.ListingUncheckedUpdateManyInput>;
    where?: Prisma.ListingWhereInput;
    limit?: number;
};
export type ListingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where: Prisma.ListingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListingCreateInput, Prisma.ListingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ListingUpdateInput, Prisma.ListingUncheckedUpdateInput>;
};
export type ListingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where: Prisma.ListingWhereUniqueInput;
};
export type ListingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
    limit?: number;
};
export type Listing$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ListingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
};
export {};
