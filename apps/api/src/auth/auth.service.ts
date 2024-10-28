import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserProvider } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { KakaoProvider } from './oauth/kakao.oauth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  async registerWithEmail(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.userService.create({
      email,
      password,
      name: email,
      provider: UserProvider.LOCAL,
      providerId: null,
    });

    const accessToken = this.signToken(user, 'access');
    const refreshToken = this.signToken(user, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }

  async signInWithEmail(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = this.userService.verifyPassword(
      user.password,
      password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const accessToken = this.signToken(user, 'access');
    const refreshToken = this.signToken(user, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }

  async signInWithKakao(code: string) {
    const kakao = new KakaoProvider(
      this.configService.get<string>('KAKAO_CLIENT_ID'),
      this.configService.get<string>('KAKAO_SECRET'),
      this.configService.get<string>('KAKAO_REDIRECT_URI'),
    );
    const { access_token } = await kakao.fetchToken(code);
    const profile = await kakao.fetchProfile(access_token);
    const kakaoUser = await this.userService.findOrCreateKakaoUser({
      email: profile.kakao_account.email,
      name: profile.kakao_account.profile.nickname,
      providerId: profile.id.toString(),
    });

    const accessToken = this.signToken(kakaoUser, 'access');
    const refreshToken = this.signToken(kakaoUser, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }

  signToken(user: User, tokenType: 'access' | 'refresh') {
    const payload = {
      sub: user.email,
      role: user.role,
      type: tokenType,
    };

    return this.jwtService.sign(payload, {
      expiresIn: tokenType === 'access' ? '1h' : '7d',
    });
  }

  reissueTokens(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token');
    }

    const accessToken = this.signToken(payload.sub, 'access');
    const newRefreshToken = this.signToken(payload.sub, 'refresh');

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
