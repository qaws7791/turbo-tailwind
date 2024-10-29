import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { User } from '../decorators/user.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request: FastifyRequest = ctx.getContext().req;

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new Error('No token provided');

    try {
      const docoded = this.jwtService.verify(token) as User;
      if (docoded?.role !== 'admin') throw new Error('Unauthorized');
      request.user = docoded;
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private extractTokenFromHeader(request: FastifyRequest): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    return authHeader.split(' ')[1];
  }
}
