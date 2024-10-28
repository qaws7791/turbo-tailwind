import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterAccountInput } from './dto/register-account.input';
import { SignInInput } from './dto/signIn.input';
import { Auth, Tokens, UserSession } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 이메일과 비밀번호로 회원가입
  @Mutation(() => Tokens)
  registerAccount(
    @Args('registerAccountInput') registerAccountInput: RegisterAccountInput,
  ) {
    return this.authService.registerWithEmail(
      registerAccountInput.email,
      registerAccountInput.password,
    );
  }

  // 이메일과 비밀번호로 로그인
  @Mutation(() => Tokens)
  signInWithEmail(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signInWithEmail(
      signInInput.email,
      signInInput.password,
    );
  }

  // 카카오로 소셜 로그인
  @Mutation(() => Tokens)
  signInWithKakao(@Args('code') code: string) {
    return this.authService.signInWithKakao(code);
  }

  // 리프레시 토큰을 이용해 액세스 토큰을 재발급
  @Mutation(() => Tokens)
  reissueTokens(@Args('refreshToken') refreshToken: string) {
    return this.authService.reissueTokens(refreshToken);
  }

  @Query(() => UserSession, { name: 'session' })
  @UseGuards(AuthGuard)
  me(@User() user: UserSession) {
    return user;
  }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }
}
