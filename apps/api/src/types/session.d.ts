import { Session } from '@fastify/secure-session';
import { UserRole } from '../users/entities/user.entity';

declare module '@fastify/secure-session' {
  interface SessionData {
    email: string;
    role: UserRole;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    session: Session<{
      email: string;
      role: UserRole;
    }>;
  }
}
