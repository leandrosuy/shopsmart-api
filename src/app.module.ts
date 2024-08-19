import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [CategoriesModule, ProductsModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
