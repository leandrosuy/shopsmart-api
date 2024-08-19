import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should import CategoriesModule', () => {
    const categoriesModule = appModule.get(CategoriesModule);
    expect(categoriesModule).toBeDefined();
  });

  it('should import ProductsModule', () => {
    const productsModule = appModule.get(ProductsModule);
    expect(productsModule).toBeDefined();
  });

  it('should import CartModule', () => {
    const cartModule = appModule.get(CartModule);
    expect(cartModule).toBeDefined();
  });
});
