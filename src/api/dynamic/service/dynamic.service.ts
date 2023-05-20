import { BadRequestException, Injectable } from '@nestjs/common';
import { DynamicRepository } from '../repository/dynamic.repository';

@Injectable()
export class DynamicService {
  constructor(private readonly dynamicRepository: DynamicRepository) {}

  async addToBestSellers(productId: string) {
    if (await this.dynamicRepository.findOneFromBestSellers(productId)) {
      throw new BadRequestException('Product already added to BestSeller');
    }

    return this.dynamicRepository.update({
      $push: { 'bestSellers.products': productId },
    });
  }

  async removeFromBestSellers(productId: string) {
    return this.dynamicRepository.update({
      $pull: { 'bestSellers.products': productId },
    });
  }

  async getBestSellers() {
    const { bestSellers: products } =
      await this.dynamicRepository.getBestSellers();
    return products;
  }
}
