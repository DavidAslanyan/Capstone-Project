import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Request, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    console.log(req.cookies)

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!decoded || !decoded['sub']) {
      throw new UnauthorizedException('Invalid token payload');
    }

    console.log("Inside middeware", decoded["sub"]);

    next();
  }
}