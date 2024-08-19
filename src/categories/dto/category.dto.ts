import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'Category ID',
    example: 1,
  })
  @IsInt({ message: 'ID must be an integer' })
  id: number;

  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-08-18T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-08-18T00:00:00.000Z',
  })
  updatedAt: Date;
}
