import { Injectable } from '@nestjs/common';
import { Auth } from '../model/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async findOneByUserId(userId: Types.ObjectId) {
    return await this.authModel.findOne({ userId: userId.toString() });
  }
  async updateOne(userId: Types.ObjectId, payload: any) {
    const userId_string = userId.toString();
    return await this.authModel.findOneAndUpdate(
      {
        userId: userId_string,
      },
      {
        ...payload,
      },
      { new: true },
    );
  }
}
