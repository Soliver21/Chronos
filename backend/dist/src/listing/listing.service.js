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
exports.ListingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ListingService = class ListingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(categoryId) {
        return this.prisma.listing.findMany({
            where: categoryId ? { categoryId } : undefined,
            orderBy: { id: 'desc' },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                category: { select: { id: true, name: true, slug: true } },
            },
        });
    }
    async findById(id) {
        const listing = await this.prisma.listing.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                category: { select: { id: true, name: true, slug: true } },
            },
        });
        if (!listing)
            throw new common_1.NotFoundException('Listing not found');
        return listing;
    }
    async create(userId, dto) {
        return this.prisma.listing.create({
            data: { ...dto, userId },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                category: { select: { id: true, name: true, slug: true } },
            },
        });
    }
    async update(id, userId, dto) {
        const listing = await this.findById(id);
        if (listing.userId !== userId)
            throw new common_1.NotFoundException('Listing not found');
        return this.prisma.listing.update({
            where: { id },
            data: dto,
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                category: { select: { id: true, name: true, slug: true } },
            },
        });
    }
    async remove(id, userId) {
        const listing = await this.findById(id);
        if (listing.userId !== userId)
            throw new common_1.NotFoundException('Listing not found');
        return this.prisma.listing.delete({ where: { id } });
    }
};
exports.ListingService = ListingService;
exports.ListingService = ListingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingService);
//# sourceMappingURL=listing.service.js.map