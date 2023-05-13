import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../service/users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';
import { Req } from 'src/core/custom_types';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns all the users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getLoggedInUser(@Request() req: Req) {
    return this.userService.getLoggedInUser(req.userData.userId);
  }
}
