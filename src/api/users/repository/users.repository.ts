import { Injectable } from '@nestjs/common';
import { User } from '../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async getAllUsers() {
    return await this.userModel.find();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
