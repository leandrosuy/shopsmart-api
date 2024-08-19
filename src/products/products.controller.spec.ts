import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    categoryId: 1,
    category: {
      id: 1,
      name: 'Test Category',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductsService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue({
      items: [mockProduct],
      itemCount: 1,
      totalItems: 1,
      pageCount: 1,
      next: null,
      previous: null,
    }),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 150,
        categoryId: 1,
      };
      const result = await controller.create(createProductDto);
      expect(result).toEqual(mockProduct);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of products with pagination', async () => {
      const result = await controller.findAll(1, 10);
      expect(result).toEqual({
        items: [mockProduct],
        itemCount: 1,
        totalItems: 1,
        pageCount: 1,
        next: null,
        previous: null,
      });
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if product not found', async () => {
      service.findOne = jest.fn().mockRejectedValue(new NotFoundException());
      await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };
      const result = await controller.update(1, updateProductDto);
      expect(result).toEqual(mockProduct);
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
    });

    it('should throw a NotFoundException if product not found', async () => {
      service.update = jest.fn().mockRejectedValue(new NotFoundException());
      await expect(controller.update(2, { name: 'Updated Product' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(mockProduct);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if product not found', async () => {
      service.remove = jest.fn().mockRejectedValue(new NotFoundException());
      await expect(controller.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});
