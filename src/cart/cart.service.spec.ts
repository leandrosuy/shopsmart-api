import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, PrismaService],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of cart items', async () => {
      const result = [
        {
          id: 1,
          productId: 1,
          productName: 'Product 1',
          validity: new Date('2023-12-31'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.cart, 'findMany').mockResolvedValue(result);
      jest.spyOn(prisma.cart, 'count').mockResolvedValue(1);

      expect(await service.findAll(1, 10)).toEqual({
        items: result,
        itemCount: result.length,
        totalItems: 1,
        pageCount: 1,
        next: null,
        previous: null,
      });
    });
  });

  describe('findOne', () => {
    it('should return a cart item by ID', async () => {
      const result = {
        id: 1,
        productId: 1,
        productName: 'Product 1',
        validity: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw a NotFoundException if cart item not found', async () => {
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Cart with ID 1 not found'),
      );
    });
  });

  describe('create', () => {
    it('should create a new cart item', async () => {
      const data: CreateCartDto = {
        productId: 1,
        productName: 'Product 1',
        expiration: new Date('2023-12-31'),
      };
      const productResult = {
        id: 1,
        name: 'Product 1',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };
      const cartResult = {
        id: 1,
        productId: 1,
        productName: 'Product 1',
        validity: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(productResult);
      jest.spyOn(prisma.cart, 'create').mockResolvedValue(cartResult);

      expect(await service.create(data)).toEqual(cartResult);
    });

    it('should throw a NotFoundException if product not found', async () => {
      const data: CreateCartDto = {
        productId: 1,
        productName: 'Product 1',
        expiration: new Date('2023-12-31'),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      await expect(service.create(data)).rejects.toThrow(
        new NotFoundException('Product with ID 1 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a cart item', async () => {
      const data: UpdateCartDto = {
        productId: 1,
        productName: 'Updated Product',
        expiration: new Date('2023-12-31'),
      };
      const result = {
        id: 1,
        productId: 1,
        productName: 'Updated Product',
        validity: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(result);
      jest.spyOn(prisma.cart, 'update').mockResolvedValue(result);

      expect(await service.update(1, data)).toEqual(result);
    });

    it('should throw a NotFoundException if cart item not found', async () => {
      const data: UpdateCartDto = {
        productId: 1,
        productName: 'Updated Product',
        expiration: new Date('2023-12-31'),
      };
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(null);

      await expect(service.update(1, data)).rejects.toThrow(
        new NotFoundException('Cart with ID 1 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should delete a cart item', async () => {
      const result = {
        id: 1,
        productId: 1,
        productName: 'Product 1',
        validity: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(result);
      jest.spyOn(prisma.cart, 'delete').mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
    });

    it('should throw a NotFoundException if cart item not found', async () => {
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Cart with ID 1 not found'),
      );
    });
  });
});
