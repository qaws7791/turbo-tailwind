import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateLocalUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async registerLocal(userDto: CreateLocalUserDto) {
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException(
        '해당 이메일로 가입된 계정이 이미 존재합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    try {
      const user = await this.userService.createLocalUser({
        ...userDto,
        password: encryptedPassword,
      });
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        '회원가입에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      return null;
    }

    const { password: encryptedPassword, ...userInfo } = user;

    if (bcrypt.compareSync(password, encryptedPassword)) {
      return userInfo;
    }

    return null;
  }

  async changeRoleToAdmin(email: string) {
    return this.userService.changeRole(email, 'admin');
  }
}
