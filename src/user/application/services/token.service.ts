import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "src/utilities/constants/global-data";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return token;
  }

  async generateRefreshToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return token;
  } 

  async saveRefreshToken(userId: string, token: string) {
    const hashedToken = await bcrypt.hash(token, 10);
    const savedRefreshToken = await this.userRepository.saveRefreshToken(userId, hashedToken);
    return savedRefreshToken;
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.getUserById(userId);

    if (!user || !user.getRefreshToken()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.getRefreshToken());
    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }

  async refreshTokens(oldRefreshToken: string) {
    try {
      const decoded = this.jwtService.verify(oldRefreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.validateRefreshToken(decoded.sub, oldRefreshToken);
      
      const userId = user.getId();
      const accessToken = await this.generateAccessToken({ sub: userId, email: user.getEmail() });
      const refreshToken = await this.generateRefreshToken({ sub: userId, email: user.getEmail() });
      await this.saveRefreshToken(userId, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token', error);
    }
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

