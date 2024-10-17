import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const session = context.switchToHttp().getRequest().session;
    console.log('session', session.get('email'));
    if (session && session.get('email')) {
      return true;
    }
    return false;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const session = context.switchToHttp().getRequest().session;
    if (session && session.get('role') === 'admin') {
      return true;
    }
    return false;
  }
}
