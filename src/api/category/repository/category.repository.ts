import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../model/category.model';
import { Model } from 'mongoose';
import { CategoryDto } from '../_dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async findCategory(query: unknown) {
    return this.categoryModel.find(query);
  }

  async createCategory(categoryDto: CategoryDto) {
    return this.categoryModel.create(categoryDto);
  }

  async getAllCategory() {
    return this.categoryModel.find();
  }

  async getCategoryById(id: string) {
    return this.categoryModel.findById(id);
  }

  async getCategoryByName(name: string) {
    return this.categoryModel.findOne({ name });
  }

  async updateCategory(id: string, categoryDto: CategoryDto) {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: id,
      },
      { name: categoryDto.name },
      { new: true },
    );
  }

  async deleteCategoryById(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
