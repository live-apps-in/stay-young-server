import { IsNotEmpty, IsString } from 'class-validator';

export class BestSellerDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;
}

export interface UpdateResult {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null | any;
  upsertedCount: number;
  matchedCount: number;
}
