import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../_dto/category.dto';
import { CategoryRepository } from '../repository/category.repository';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(categoryDto: CategoryDto) {
    const { name } = categoryDto;
    const category = await this.categoryRepository.getByName(
      name.toLowerCase(),
    );
    if (category) {
      throw new BadRequestException(`Category ${name} already exists`);
    }
    return this.categoryRepository.create({
      ...categoryDto,
      name: name.toLowerCase(),
    });
  }

  async getAllCategory() {
    return this.categoryRepository.getAll();
  }

  async getSingleCategory(id: string) {
    return this.categoryRepository.getById(id);
  }

  async updateCategory(categoryId: string, categoryDto: CategoryDto) {
    const { name } = categoryDto;
    const category = await this.categoryRepository.getById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const isCategoryExists = await this.categoryRepository.getByName(name);
    if (isCategoryExists) {
      throw new BadRequestException(`Category ${name} already exists`);
    }
    return this.categoryRepository.update(categoryId, categoryDto);
  }

  async deleteCategory(categoryId: string) {
    const category = await this.categoryRepository.getById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.deleteById(categoryId);
    return { message: 'Category Deleted Successfully' };
  }
}
