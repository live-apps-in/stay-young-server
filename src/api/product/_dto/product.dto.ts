import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/api/category/model/category.model';

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

  @ApiProperty({
    example: ['cruelty free', 'Vegan friendly', 'plus three', 'ph-range'],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly detailTags: string[];

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
  @IsNumber()
  readonly stockAvailable: number;

  @ApiProperty({
    example: 'This toner is designed to brighten and even out skin tone.',
  })
  @IsString()
  readonly description: string;
}
