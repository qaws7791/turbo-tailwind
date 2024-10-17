import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLocalUserDto } from '../users/dto/create-user.dto';
import { FastifyRequest } from 'fastify';
import { LocalLoginDto } from './dto/local-login.dto';
import { USER_ROLES, UserRole } from '../users/entities/user.entity';
import { Auth } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateLocalUserDto) {
    return await this.authService.registerLocal(userDto);
  }

  @Post('login')
  async login(@Req() req: FastifyRequest, @Body() loginDto: LocalLoginDto) {
    const user = await this.authService.validateLocalUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new HttpException('로그인에 실패했습니다.', 401);
    }
    req.session.set('email', user.email);
    req.session.set('role', user.role);
    return;
  }

  @Auth(USER_ROLES.USER, USER_ROLES.ADMIN)
  @Post('logout')
  async logout(@Req() req: FastifyRequest) {
    req.session.delete();
    return '로그아웃 되었습니다.';
  }

  @Auth(USER_ROLES.USER)
  @Get('user')
  testUserWithSession(@Req() req: FastifyRequest) {
    return req.session.get('email');
  }

  @Auth(USER_ROLES.ADMIN)
  @Get('admin')
  testAdminWithSession(@Req() req: FastifyRequest) {
    return req.session.get('email');
  }

  @Auth(USER_ROLES.USER, USER_ROLES.ADMIN)
  @Post('get-admin-role')
  getAdminRole(@Req() req: FastifyRequest) {
    if (req.session.get('role') === 'admin') {
      return 'admin';
    }
    return this.authService.changeRoleToAdmin(req.session.get('email'));
  }
}
