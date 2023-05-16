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
    if (await this.categoryRepository.isNameAlreadyExists(categoryDto.name)) {
      throw new BadRequestException(
        `Category ${categoryDto.name} already exists`,
      );
    }
    return this.categoryRepository.create(categoryDto);
  }

  async getAllCategory() {
    return this.categoryRepository.getAll();
  }

  async getSingleCategory(id: string) {
    return this.categoryRepository.getById(id);
  }

  async updateCategory(categoryId: string, categoryDto: CategoryDto) {
    const category = await this.categoryRepository.getById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    // Check whether category exists only if the incoming category name is new
    if (category.name !== categoryDto.name) {
      if (await this.categoryRepository.isNameAlreadyExists(categoryDto.name)) {
        throw new BadRequestException(
          `Category ${categoryDto.name} already exists`,
        );
      }
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
