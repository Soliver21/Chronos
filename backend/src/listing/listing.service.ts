import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.listing.findMany({
      orderBy: { id: 'desc' },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async create(userId: number, dto: CreateListingDto) {
    return this.prisma.listing.create({
      data: { ...dto, userId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async update(id: number, userId: number, dto: UpdateListingDto) {
    const listing = await this.findOne(id);
    if (listing.userId !== userId) throw new NotFoundException('Listing not found');
    return this.prisma.listing.update({
      where: { id },
      data: dto,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async remove(id: number, userId: number) {
    const listing = await this.findOne(id);
    if (listing.userId !== userId) throw new NotFoundException('Listing not found');
    return this.prisma.listing.delete({ where: { id } });
  }
}
