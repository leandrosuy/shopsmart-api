import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsOptional, IsDate, IsInt } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({
    description: 'ID of the product to be updated in the cart',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  productId?: number;

  @ApiProperty({
    description: 'Name of the product to be updated in the cart',
    example: 'Laptop',
    required: false,
  })
  @IsOptional()
  productName?: string;

  @ApiProperty({
    description: 'Updated expiration date of the product in the cart',
    example: '2025-12-31T23:59:59Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  expiration?: Date;
}
