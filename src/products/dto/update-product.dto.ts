import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 999.99,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'ID of the associated category',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
