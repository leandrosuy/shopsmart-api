import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.category.findMany({
        skip,
        take: limit,
      }),
      this.prisma.category.count(),
    ]);

    const pageCount = Math.ceil(totalItems / limit);
    const next = page < pageCount ? `/categories?page=${page + 1}` : null;
    const previous = page > 1 ? `/categories?page=${page - 1}` : null;

    return {
      items,
      itemCount: items.length,
      totalItems,
      pageCount,
      next,
      previous,
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
