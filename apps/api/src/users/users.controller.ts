import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    const user = await this.usersService.getUser(email);
    console.log(user);
    return user;
  }

  @Patch(':email')
  async updateUser(@Param('email') email: string, @Body() user: User) {
    console.log(user);
    return this.usersService.updateUser(email, user);
  }
}
