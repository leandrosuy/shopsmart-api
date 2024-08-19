import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'ID of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
  })
  name: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 999.99,
  })
  price: number;

  @ApiProperty({
    description: 'Creation date of the product',
    example: '2024-08-18T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the product',
    example: '2024-08-18T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'ID of the associated category',
    example: 2,
  })
  categoriaId: number;
}
