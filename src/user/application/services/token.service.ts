import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "src/utilities/constants/global-data";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return token;
  }

  async generateRefreshToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException(ERROR_MESSAGES.invalid_token);
    }
  }

  async handleTokenValidation(
    accessToken: string,
    refreshToken: string,
    payload: any
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    try {
      await this.verifyToken(accessToken);
      return { accessToken };
    } catch {
      try {
        await this.verifyToken(refreshToken);
        const newAccessToken = await this.generateAccessToken(payload);
        return { accessToken: newAccessToken };
      } catch {
        throw new UnauthorizedException(ERROR_MESSAGES.tokens_expired);
      }
    }
  }
}

