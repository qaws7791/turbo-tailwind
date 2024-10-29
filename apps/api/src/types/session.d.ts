import { Session } from '@fastify/secure-session';
import { UserRole } from '../users/entities/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      sub: string;
      role: UserRole;
    };
  }
}
