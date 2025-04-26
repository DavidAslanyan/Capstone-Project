import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { TokenService } from 'src/user/application/services/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    let accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.headers['x-refresh-token'];

    if (!accessToken) {
      if (!refreshToken) throw new UnauthorizedException('No tokens provided');
      return await this.tryRefreshToken(req, res, refreshToken);
    }

    try {
      req.user = this.jwtService.verify(accessToken, { secret: process.env.JWT_ACCESS_SECRET });
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError' && refreshToken) {
        return await this.tryRefreshToken(req, res, refreshToken);
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }

  private async tryRefreshToken(req: Request, res: Response, refreshToken: string): Promise<boolean> {
    const newTokens = await this.tokenService.refreshTokens(refreshToken);
    req.user = this.jwtService.verify(newTokens.accessToken, { secret: process.env.JWT_ACCESS_SECRET });

    res.setHeader("Authorization", `Bearer ${newTokens.accessToken}`);
    res.setHeader("x-refresh-token", newTokens.refreshToken);

    return true;
  }
}
