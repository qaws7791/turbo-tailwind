import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { User, UserProvider } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * @description 사용자 생성
   * @param email 가입 이메일
   * @param password 가입 비밀번호
   * @param name 사용자 이름
   * @param provider 가입 제공자. 이메일 가입인 경우 'local', 소셜 로그인인 경우 'kakao'
   * @param providerId 소셜 로그인인 경우 소셜 로그인 제공자에서 발급한 ID. 이메일 가입인 경우 null
   * @returns 생성된 사용자 정보
   */
  async create({
    email,
    password,
    name,
    provider,
    providerId,
  }: {
    email: string;
    password: string;
    name: string;
    provider: UserProvider;
    providerId: string | null;
  }) {
    if (provider !== UserProvider.LOCAL && providerId === null) {
      throw new Error(
        '소셜 로그인으로 계정 생성 시에는 providerId가 필요합니다.',
      );
    }
    const hashedPassword = await this.hashPassword(password);
    return this.usersRepository.save({
      email,
      name,
      password: hashedPassword,
      provider: provider,
      providerId: provider === UserProvider.LOCAL ? null : providerId,
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  hashPassword(password: string) {
    return argon2.hash(password);
  }

  verifyPassword(hashedPassword: string, password: string) {
    return argon2.verify(hashedPassword, password);
  }
}
