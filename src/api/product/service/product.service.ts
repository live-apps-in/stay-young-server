import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { ProductDto } from '../_dto/product.dto';
import { CategoryRepository } from 'src/api/category/repository/category.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createProduct(productDto: ProductDto) {
    const { name, subName, category } = productDto;
    // Checking if product name already exists
    if (await this.productRepository.getByName(name)) {
      throw new BadRequestException(
        `Product with name ${name} already exists. Please give a different name`,
      );
    }
    // Checking whether the categoryId coming from client exists in database
    const categories = await this.categoryRepository.find({
      _id: { $in: category },
    });
    if (categories.length !== category.length) {
      throw new NotFoundException('One or more categories not found');
    }

    // Generate slug from subName
    let slug = subName.replace(/\s+/g, '-').toLowerCase();
    // Check if slug already exists
    let slugExists = await this.productRepository.findOne({ slug });
    // Append "-1" or increment number if necessary
    let count = 1;
    while (slugExists) {
      const countMatch = slug.match(/-(\d+)$/);
      if (countMatch) {
        count = parseInt(countMatch[1]) + 1;
        slug = slug.replace(/-\d+$/, `-${count}`);
      } else {
        slug = `${slug}-${count}`;
      }
      slugExists = await this.productRepository.findOne({ slug });
    }

    // Creating Product with attaching slug property
    const createdProduct = await this.productRepository.create({
      ...productDto,
      slug,
    });
    // Populating category
    const populatedProduct = (
      await createdProduct.populate('category')
    ).populate('brand');
    return populatedProduct;
  }

  async getProductBySlug(slug: string) {
    return this.productRepository.findOne({
      slug,
    });
  }

  async getProductsByCategoryName(categoryName: string) {
    return this.productRepository.getByCategory(categoryName);
  }

  async getProductsByBrandName(brandName: string) {
    return this.productRepository.getByBrand(brandName);
  }

  async getById(id: string) {
    return this.productRepository.findById(id);
  }

  async getAllProducts() {
    return this.productRepository.getAll();
  }

  async updateProduct(productDto: ProductDto, productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    const { name, subName, category } = productDto;

    // Checking if product name already exists only if incoming name is new
    if (product.name !== name) {
      if (await this.productRepository.getByName(name)) {
        throw new BadRequestException(
          `Product with name ${name} already exists. Please give a different name`,
        );
      }
    }

    // Checking whether the categoryId coming from client exists in database
    const categories = await this.categoryRepository.find({
      _id: { $in: category },
    });
    if (categories.length !== category.length) {
      throw new NotFoundException('One or more categories not found');
    }

    if (product.subName !== subName) {
      // Generate slug from subName
      let slug = subName.replace(/\s+/g, '-').toLowerCase();
      // Check if slug already exists
      let slugExists = await this.productRepository.findOne({ slug });

      let count = 1;
      while (slugExists) {
        const countMatch = slug.match(/-(\d+)$/);
        if (countMatch) {
          count = parseInt(countMatch[1]) + 1;
          slug = slug.replace(/-\d+$/, `-${count}`);
        } else {
          slug = `${slug}-${count}`;
        }
        slugExists = await this.productRepository.findOne({ slug });
      }
      const updatedProduct = await this.productRepository.findOneAndUpdate(
        productId,
        {
          ...productDto,
          slug,
        },
      );
      return updatedProduct.populate('category');
    } else {
      const updatedProduct = await this.productRepository.findOneAndUpdate(
        productId,
        {
          ...productDto,
        },
      );

      return updatedProduct.populate('category');
    }
  }

  async deleteProduct(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.delete(productId);
    return { message: 'Product deleted Successfully' };
  }

  async search(searchQuery: any) {
    const { name } = searchQuery;
    return this.productRepository.search(name);
  }
}
