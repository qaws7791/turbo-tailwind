import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateLocalUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUser(email: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  async updateUser(email: string, _user: User): Promise<void> {
    const user = await this.getUser(email);
    const newUser = { ...user, ..._user };
    await this.userRepository.save(newUser);
  }

  async createLocalUser(userDto: CreateLocalUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...userDto,
      provider: 'local',
      providerId: null,
    });
    return this.userRepository.save(user);
  }

  async changeRole(email: string, role: UserRole): Promise<void> {
    const user = await this.getUser(email);
    user.role = role;
    await this.userRepository.save(user);
  }
}
