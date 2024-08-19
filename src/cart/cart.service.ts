import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.cart.findMany({
        skip,
        take: limit,
      }),
      this.prisma.cart.count(),
    ]);

    const pageCount = Math.ceil(totalItems / limit);
    const next = page < pageCount ? `/cart?page=${page + 1}` : null;
    const previous = page > 1 ? `/cart?page=${page - 1}` : null;

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
    const cart = await this.prisma.cart.findUnique({
      where: { id },
    });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async create(data: CreateCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${data.productId} not found`);
    }

    return this.prisma.cart.create({
      data: {
        product: { connect: { id: data.productId } },
        productName: data.productName,
        validity: data.expiration,
      },
    });
  }

  async update(id: number, data: UpdateCartDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return this.prisma.cart.update({
      where: { id },
      data: {
        product: data.productId ? { connect: { id: data.productId } } : undefined,
        productName: data.productName,
        validity: data.expiration,
      },
    });
  }

  async remove(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return this.prisma.cart.delete({
      where: { id },
    });
  }
}
