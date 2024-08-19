import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'ID of the product to be added to the cart',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
  })
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    description: 'Expiration date of the product in the cart',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDate()
  @IsNotEmpty()
  expiration: Date;
}
