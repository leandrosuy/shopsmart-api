import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartDto } from './dto/cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new product to the cart' })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart successfully.',
    type: CartDto,
  })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'List of cart items.',
    type: [CartDto],
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.cartService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart item found.',
    type: CartDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Cart item not found.',
  })
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiResponse({
    status: 200,
    description: 'Cart item updated successfully.',
    type: CartDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Cart item not found.',
  })
  update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(Number(id), updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cart item' })
  @ApiResponse({
    status: 200,
    description: 'Cart item removed successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cart item not found.',
  })
  remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }
}
