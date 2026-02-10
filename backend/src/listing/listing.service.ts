import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(categoryId?: number) {
    return this.prisma.listing.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: { id: "desc" },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async findById(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
    if (!listing) throw new NotFoundException("Listing not found");
    return listing;
  }

  async create(userId: number, dto: CreateListingDto) {
    return this.prisma.listing.create({
      data: { ...dto, userId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async update(id: number, userId: number, dto: UpdateListingDto) {
    const listing = await this.findById(id);
    if (listing.userId !== userId) throw new NotFoundException("Listing not found");
    return this.prisma.listing.update({
      where: { id },
      data: dto,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async remove(id: number, userId: number) {
    const listing = await this.findById(id);
    if (listing.userId !== userId) throw new NotFoundException("Listing not found");
    return this.prisma.listing.delete({ where: { id } });
  }
}
