import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      this.prisma.product.count(),
    ]);

    const pageCount = Math.ceil(totalItems / limit);
    const next = page < pageCount ? `/products?page=${page + 1}` : null;
    const previous = page > 1 ? `/products?page=${page - 1}` : null;

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
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // Include associated category
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!categoryExists) {
      throw new BadRequestException(`Category with ID ${data.categoryId} does not exist`);
    }

    return this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        category: { connect: { id: data.categoryId } },
      },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (data.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!categoryExists) {
        throw new BadRequestException(`Category with ID ${data.categoryId} does not exist`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        category: data.categoryId ? { connect: { id: data.categoryId } } : undefined,
      },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
