import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly validToken = '2UCyZwJ04yWPiurfpuuAFG7f3WCCCjkMdTkPK9lYhTiBw3iV5URnb19vrG4sFn9R'; // Replace with your fixed token

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token || token !== this.validToken) {
      throw new UnauthorizedException('Invalid auth token');
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | null {
    const cookie = request.cookies['auth-cookie'];
    console.log(request.cookies);
    return cookie ? cookie : null;
  }
}