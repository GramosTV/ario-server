import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly validToken = '2UCyZwJ04yWPiurfpuuAFG7f3WCCCjkMdTkPK9lYhTiBw3iV5URnb19vrG4sFn9R';

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token || token !== this.validToken) {
            throw new UnauthorizedException('Invalid auth token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return null;
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return null;
        }
        return token;
    }
}