import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({
    description: 'ID of the cart item',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the product',
    example: 1,
  })
  productId: number;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
  })
  productName: string;

  @ApiProperty({
    description: 'Expiration date of the product in the cart',
    example: '2024-08-30T00:00:00.000Z',
  })
  expirationDate: Date;

  @ApiProperty({
    description: 'Creation date of the cart item',
    example: '2024-08-18T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the cart item',
    example: '2024-08-18T00:00:00.000Z',
  })
  updatedAt: Date;
}
