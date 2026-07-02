import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_SECRET } from '@/config/envs';

type JwtUserPayload = {
  sub: string;
};

export type RequestWithUserId = Request & {
  userId?: string;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUserId>();
    const path = (request.originalUrl ?? request.url ?? '').split('?')[0];

    if (path === '/auth/login' || path === '/auth/register') {
      return true;
    }
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const payload = this.jwtService.verify<JwtUserPayload>(
      authorization.slice(7),
      {
        secret: JWT_SECRET,
      },
    );

    request.userId = payload.sub;
    return true;
  }
}
