import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  USER_PROVIDERS,
  USER_ROLES,
  UserProvider,
  UserRole,
} from '../entities/user.entity';

export class CreateLocalUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string | null;

  @IsString()
  username: string;

  @IsEnum(USER_PROVIDERS)
  provider: UserProvider;

  @IsOptional()
  providerId: number;

  @IsEnum(USER_ROLES)
  role: UserRole;
}
