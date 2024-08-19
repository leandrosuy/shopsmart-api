import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory = {
    id: 1,
    name: 'Test Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCategoriesService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue({
      items: [mockCategory],
      itemCount: 1,
      totalItems: 1,
      pageCount: 1,
      next: null,
      previous: null,
    }),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
    remove: jest.fn().mockResolvedValue(mockCategory),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'New Category' };
      const result = await controller.create(createCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of categories', async () => {
      const result = await controller.findAll(1, 10);
      expect(result.items).toEqual([mockCategory]);
      expect(result.totalItems).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockCategory);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if category not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      const result = await controller.update(1, updateCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });

    it('should throw a NotFoundException if category not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());
      await expect(controller.update(999, { name: 'Updated Category' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(mockCategory);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if category not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException());
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});

