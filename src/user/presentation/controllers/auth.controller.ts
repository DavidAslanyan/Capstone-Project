import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiCreateUser } from "src/swagger/user/user.swagger";
import { CreateUserDto } from "src/user/application/dtos/input/create-user.dto";
import { AuthService } from "src/user/application/services/auth.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";
import { LoginUserDto } from "src/user/application/dtos/input/login-user.dto";
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from "../guards/jwt.guard";
import { Request } from "express";
import { GoogleLoginDto } from "src/user/application/dtos/input/google-login.dto";


@Controller(`${BASE_ROUTE}/auth`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginUserDto: LoginUserDto,  @Res({ passthrough: true }) res: Response,) {
    return await this.authService.login(loginUserDto);
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.authService.logout(userId);
  }

  @Post("google")
  async googleLogin(@Body() googleLoginDto:  GoogleLoginDto) {
    return this.authService.googleLogin(googleLoginDto);
  }

  
}