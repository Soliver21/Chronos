"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }, select: { id: true, name: true, email: true, bio: true, avatar: true },
        });
        if (!user)
            throw new common_1.NotFoundException(`User not found`);
        return user;
    }
    async updateUser(id, user) {
        return await this.prisma.user.update({
            where: { id },
            data: user,
            select: { id: true, name: true, email: true, bio: true, avatar: true },
        });
    }
    async getUserStatistics(id) {
        const [clientTransactions, providerTransactions, reviews] = await Promise.all([
            this.prisma.transaction.findMany({ where: { clientId: id } }),
            this.prisma.transaction.findMany({ where: { providerId: id } }),
            this.prisma.review.findMany({ where: { userId: id } }),
        ]);
        const transactions = [...clientTransactions, ...providerTransactions];
        const totalTransactions = transactions.length;
        const totalReviews = reviews.length;
        const totalAmount = transactions.reduce((sum, t) => sum + (t.totalPrice ?? 0), 0);
        const averageRating = totalReviews === 0
            ? null
            : Number((reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalReviews).toFixed(2));
        return {
            totalTransactions,
            totalReviews,
            totalAmount,
            averageRating,
            transactions,
            reviews,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map