import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Brand } from 'src/api/brand/model/brand.model';
import { Category } from 'src/api/category/model/category.model';

export class DescriptionDto {
  @ApiProperty({
    example:
      'Infused with a nourishing blend of organic ingredients, Klairs Rich Moist Soothing Serum is designed to deeply hydrate and calm the skin.',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty({ example: 'Aqua (Water), Butylene Glycol, Dimethyl Sulfone' })
  @IsNotEmpty()
  @IsString()
  readonly ingredients: string;

  @ApiProperty({
    example:
      'After cleansing your face normally, apply klairs rich moist soothing serum to the damp skin Wait for a few minutes for the product to get absorbed fully.',
  })
  @IsNotEmpty()
  @IsString()
  readonly usage: string;
}

export class ProductDto {
  @ApiProperty({ example: 'Hyaluronic Acid Toner' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Plumpig Formula' })
  @IsNotEmpty()
  @IsString()
  readonly subName: string;

  @ApiProperty({ example: ['objectId'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly category: Category[];

  @ApiProperty({ example: 'Brand Id' })
  @IsString()
  @IsNotEmpty()
  readonly brand: Brand;

  @ApiProperty({
    example: [
      {
        isActive: true,
        name: 'cruelty-free',
        content: 'Cruelty Free',
      },
      { isActive: false, name: 'ph-range', content: '2-3' },
      {
        isActive: true,
        name: 'additional-info',
        content: 'Additional Information',
      },
    ],
  })
  @IsArray()
  readonly detailTags: Array<{
    isActive: boolean;
    name: string;
    content: string;
  }>;

  @ApiProperty({ example: ['image1Url', 'Image2Url', 'Image3Url'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly images: string[];

  @ApiProperty({ example: 250 })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @IsNotEmpty()
  readonly discountedPrice: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  readonly stockAvailable: number;

  @ApiProperty({ type: DescriptionDto })
  @IsNotEmpty()
  @Type(() => DescriptionDto)
  @ValidateNested()
  readonly description: DescriptionDto;
}
