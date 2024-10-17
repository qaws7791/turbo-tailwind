import { IsEmail, IsString } from 'class-validator';

export class LocalLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
