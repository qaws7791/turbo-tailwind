import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async validate(request: FastifyRequest) {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authorization.replace('Bearer ', '');
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
