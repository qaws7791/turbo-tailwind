import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../../users/entities/user.entity';

export const getCurrentUser = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};

export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUser(context);
  },
);

export type User = {
  sub: string;
  role: UserRole;
};
