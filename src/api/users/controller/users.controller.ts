import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns all the users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
