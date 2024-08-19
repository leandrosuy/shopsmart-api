import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 1,
      name: 'Test Category',
    },
  };

  const mockPrisma = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const result = [mockProduct];
      mockPrisma.product.findMany.mockResolvedValue(result);
      mockPrisma.product.count.mockResolvedValue(1);

      const paginatedResult = {
        items: result,
        itemCount: 1,
        totalItems: 1,
        pageCount: 1,
        next: null,
        previous: null,
      };

      const actualResult = await service.findAll(1, 10);
      expect(actualResult).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 150,
        categoryId: 1,
      };

      mockPrisma.category.findUnique.mockResolvedValue({ id: 1, name: 'Test Category' });
      mockPrisma.product.create.mockResolvedValue({
        ...mockProduct,
        ...createProductDto,
        id: 2,
      });

      const result = await service.create(createProductDto);
      expect(result).toEqual({
        ...mockProduct,
        ...createProductDto,
        id: 2,
      });
    });

    it('should throw an error if category does not exist', async () => {
      const createProductDto = {
        name: 'New Product',
        price: 150,
        categoryId: 1,
      };

      mockPrisma.category.findUnique.mockResolvedValue(null);

      await expect(service.create(createProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto = {
        name: 'Updated Product',
        price: 200,
      };

      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);
      mockPrisma.product.update.mockResolvedValue({
        ...mockProduct,
        ...updateProductDto,
      });

      const result = await service.update(1, updateProductDto);
      expect(result).toEqual({
        ...mockProduct,
        ...updateProductDto,
      });
    });

    it('should throw an error if product not found', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(service.update(1, { name: 'Updated Product' })).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if category does not exist when updating', async () => {
      const updateProductDto = {
        name: 'Updated Product',
        price: 200,
        categoryId: 2,
      };

      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);
      mockPrisma.category.findUnique.mockResolvedValue(null);

      await expect(service.update(1, updateProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);
      mockPrisma.product.delete.mockResolvedValue(mockProduct);

      const result = await service.remove(1);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
