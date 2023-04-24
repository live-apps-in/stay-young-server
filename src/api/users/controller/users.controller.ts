import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
