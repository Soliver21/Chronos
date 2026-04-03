import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  // Visszaadja az összes hirdetést, opcionálisan kategória szerint szűrve.
  async findAll(categoryId?: number) {
    return this.prisma.listing.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: { id: "desc" },
      include: {
        user: { select: { id: true, name: true, avatar: true, averageRating: true, trustLevel: true } },
        category: { select: { id: true, name: true, slug: true, imageUrl: true } },
      },
    });
  }

  // Visszaadja az adott felhasználó hirdetéseit.
  async findByUserId(userId: number) {
    return this.prisma.listing.findMany({
      where: { userId },
      orderBy: { id: "desc" },
      include: {
        user: { select: { id: true, name: true, avatar: true, averageRating: true, trustLevel: true } },
        category: { select: { id: true, name: true, slug: true, imageUrl: true } },
      },
    });
  }

  // Visszaad egy hirdetést azonosító alapján; ha nem létezik, 404-et dob.
  async findById(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, averageRating: true, trustLevel: true } },
        category: { select: { id: true, name: true, slug: true, imageUrl: true } },
      },
    });
    if (!listing) throw new NotFoundException("Listing not found");
    return listing;
  }

  // Létrehoz egy új hirdetést a bejelentkezett felhasználó nevében.
  async create(userId: number, dto: CreateListingDto) {
    return this.prisma.listing.create({
      data: { ...dto, userId },
      include: {
        user: { select: { id: true, name: true, avatar: true, averageRating: true, trustLevel: true } },
        category: { select: { id: true, name: true, slug: true, imageUrl: true } },
      },
    });
  }

  // Frissíti a hirdetés adatait; csak a tulajdonos módosíthatja.
  async update(id: number, userId: number, dto: UpdateListingDto) {
    const listing = await this.findById(id);
    if (listing.userId !== userId) throw new NotFoundException("Listing not found");
    return this.prisma.listing.update({
      where: { id },
      data: dto,
      include: {
        user: { select: { id: true, name: true, avatar: true, averageRating: true, trustLevel: true } },
        category: { select: { id: true, name: true, slug: true, imageUrl: true } },
      },
    });
  }

  // Törli a hirdetést; csak a tulajdonos törölheti.
  async remove(id: number, userId: number) {
    const listing = await this.findById(id);
    if (listing.userId !== userId) throw new NotFoundException("Listing not found");
    return this.prisma.listing.delete({ where: { id } });
  }
}