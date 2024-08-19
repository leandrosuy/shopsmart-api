import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart item', async () => {
      const createCartDto: CreateCartDto = { productId: 1, productName: 'Test Product', expiration: new Date() };
      const result = {
        id: 1,
        productId: 1,
        productName: 'Test Product',
        validity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCartDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createCartDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cart items', async () => {
      const result = {
        items: [
          {
            id: 1,
            productId: 1,
            productName: 'Test Product',
            validity: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        itemCount: 1,
        totalItems: 1,
        pageCount: 1,
        next: null,
        previous: null,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(1, 10)).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single cart item', async () => {
      const result = {
        id: 1,
        productId: 1,
        productName: 'Test Product',
        validity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a cart item', async () => {
      const updateCartDto: UpdateCartDto = { productId: 1, productName: 'Updated Product', expiration: new Date() };
      const result = {
        id: 1,
        productId: 1,
        productName: 'Updated Product',
        validity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateCartDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, updateCartDto);
    });
  });

  describe('remove', () => {
    it('should remove a cart item', async () => {
      const result = {
        id: 1,
        productId: 1,
        productName: 'Test Product',
        validity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
