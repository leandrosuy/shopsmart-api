import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created.',
    type: CategoryDto,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories.',
    type: [CategoryDto],
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.categoriesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category found.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({
    status: 200,
    description: 'Category successfully updated.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 200,
    description: 'Category successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(Number(id));
  }
}
