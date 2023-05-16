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

  async find(query: unknown) {
    return this.categoryModel.find(query);
  }

  async create(categoryDto: CategoryDto) {
    return this.categoryModel.create(categoryDto);
  }

  async getAll() {
    return this.categoryModel.find();
  }

  async getById(id: string) {
    return this.categoryModel.findById(id);
  }

  async getByName(name: string) {
    return this.categoryModel.findOne({
      name: { $regex: new RegExp(name, 'i') },
    });
  }

  async update(id: string, categoryDto: CategoryDto) {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: id,
      },
      { name: categoryDto.name, image: categoryDto.image },
      { new: true },
    );
  }

  async deleteById(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
