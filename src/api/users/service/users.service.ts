import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async getAllUsers() {
    return this.userRepo.getAll();
  }

  async getLoggedInUser(userId: string) {
    const userDetails = await this.userRepo.findById(userId);
    return { user: userDetails };
  }
}
