"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewOrderByRelevanceFieldEnum = exports.NullsOrder = exports.ListingOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.SortOrder = exports.ReviewScalarFieldEnum = exports.TransactionScalarFieldEnum = exports.ListingScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = require("@prisma/client/runtime/index-browser");
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Listing: 'Listing',
    Transaction: 'Transaction',
    Review: 'Review'
};
exports.TransactionIsolationLevel = {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    trustLevel: 'trustLevel'
};
exports.ListingScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    type: 'type',
    userId: 'userId'
};
exports.TransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId',
    status: 'status'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    userId: 'userId',
    transactionId: 'transactionId'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.UserOrderByRelevanceFieldEnum = {
    name: 'name',
    email: 'email',
    password: 'password'
};
exports.ListingOrderByRelevanceFieldEnum = {
    title: 'title',
    description: 'description',
    category: 'category'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.ReviewOrderByRelevanceFieldEnum = {
    comment: 'comment'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map