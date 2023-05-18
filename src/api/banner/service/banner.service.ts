import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BannerRepository } from '../repository/banner.repository';
import { BannerDto } from '../_dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(private readonly bannerRepository: BannerRepository) {}
  async create(bannerDto: BannerDto) {
    const { displayIndex } = bannerDto;
    const count = await this.bannerRepository.countAll();
    if (count >= 5) {
      throw new BadRequestException('Maximum Banners Reached');
    }
    const bannerWithSameDisdisplayIndexExists =
      await this.bannerRepository.findOne({
        displayIndex,
      });
    if (bannerWithSameDisdisplayIndexExists) {
      throw new BadRequestException(
        `Banner with position ${displayIndex} already exists. Please select another position. `,
      );
    }
    return this.bannerRepository.create(bannerDto);
  }

  async getAll() {
    const banners = await this.bannerRepository.getAll({});
    const sortedBanners = banners.sort(
      (a: BannerDto, b: BannerDto) => a.displayIndex - b.displayIndex,
    );
    return sortedBanners;
  }

  async getById(id: string) {
    return this.bannerRepository.findById(id);
  }

  async update(bannerId: string, bannerDto: BannerDto) {
    const { displayIndex } = bannerDto;
    const banner = await this.bannerRepository.findById(bannerId);
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    if (banner.displayIndex !== displayIndex) {
      const bannerWithSameDisdisplayIndex = await this.bannerRepository.findOne(
        {
          displayIndex,
        },
      );
      if (bannerWithSameDisdisplayIndex) {
        // Swap the displayIndexs
        bannerWithSameDisdisplayIndex.displayIndex = banner.displayIndex;
        await this.bannerRepository.update(
          bannerWithSameDisdisplayIndex._id.toString(),
          {
            ...bannerWithSameDisdisplayIndex,
          },
        );
      }
    }

    return this.bannerRepository.update(bannerId, {
      ...bannerDto,
    });
  }

  async delete(bannerId: string) {
    const count = await this.bannerRepository.countAll();
    if (count === 2) {
      throw new BadRequestException(
        'At least two banners must be retained and cannot be deleted',
      );
    }
    const banner = await this.bannerRepository.findById(bannerId);
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    await this.bannerRepository.delete(bannerId);

    // Update the displayIndex of remaining banners
    const bannersToUpdate = await this.bannerRepository.getAll({
      displayIndex: { $gt: banner.displayIndex },
    });

    for (const bannerToUpdate of bannersToUpdate) {
      bannerToUpdate.displayIndex -= 1;
      await this.bannerRepository.update(
        bannerToUpdate._id.toString(),
        bannerToUpdate,
      );
    }
  }
}
