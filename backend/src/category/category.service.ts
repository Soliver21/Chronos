import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.listingCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    });
  }
}
