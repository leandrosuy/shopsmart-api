import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  const mockCategory = {
    id: 1,
    name: 'Test Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    category: {
      findMany: jest.fn().mockResolvedValue([mockCategory]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue(mockCategory),
      create: jest.fn().mockResolvedValue(mockCategory),
      update: jest.fn().mockResolvedValue(mockCategory),
      delete: jest.fn().mockResolvedValue(mockCategory),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of categories', async () => {
      const result = await service.findAll(1, 10);
      expect(result.items).toEqual([mockCategory]);
      expect(result.totalItems).toBe(1);
      expect(result.pageCount).toBe(1);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw a NotFoundException if category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null); // Simulando retorno null
      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException(`Category with ID 999 not found`),
      );
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto = { name: 'New Category' };
      const result = await service.create(createCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
      });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto = { name: 'Updated Category' };
      const result = await service.update(1, updateCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCategoryDto,
      });
    });

    it('should throw a NotFoundException if category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null); // Simulando retorno null
      const updateCategoryDto = { name: 'Updated Category' };
      await expect(service.update(999, updateCategoryDto)).rejects.toThrow(
        new NotFoundException(`Category with ID 999 not found`),
      );
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockCategory);
      expect(prisma.category.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null); // Simulando retorno null
      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundException(`Category with ID 999 not found`),
      );
    });
  });
});
