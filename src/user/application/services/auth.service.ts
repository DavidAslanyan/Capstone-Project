import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/input/create-user.dto";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TokenService } from "./token.service";
import { CreateUserCommand } from "../cqrs/commands/user/create-user.command";
import { UserModel } from "src/user/domain/models/user.model";
import { formatUserOutput } from "src/utilities/functions/format-user-output";
import { CustomResponse } from "../responses/custom-response.dto";
import { USER_RESPONSE_MESSAGES } from "src/utilities/constants/response-messages";
import { LoginUserDto } from "../dtos/input/login-user.dto";
import { LoginUserCommand } from "../cqrs/commands/user/login-user.command";
import { jwtDecode } from "jwt-decode";
import { GoogleLoginDto } from "../dtos/input/google-login.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const userCommand = new CreateUserCommand(createUserDto);
      const user: UserModel = await this.commandBus.execute(userCommand);
      const userOutput = formatUserOutput(user);
  
      return new CustomResponse(
        HttpStatus.CREATED, 
        userOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_create_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_create_fail
      );
    }
  }
  
  async login(loginUserDto: LoginUserDto) {
    try {
      const userCommand = new LoginUserCommand(loginUserDto);
      const user: UserModel = await this.commandBus.execute(userCommand);

      const userEmail = user.getEmail();
      const userId = user.getId();
      const payload = { email: userEmail, sub: userId };

      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken = await this.tokenService.generateRefreshToken(payload);
      await this.tokenService.saveRefreshToken(userId, refreshToken);
      
      const userOutput = {
        user: formatUserOutput(user),
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      };
  
      return new CustomResponse(
        HttpStatus.ACCEPTED, 
        userOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_login_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_login_fail
      );
    }
  }

  async logout(userId: string) {
    try {
      await this.userRepository.logout(userId);

      return new CustomResponse(
        HttpStatus.ACCEPTED, 
        null, 
        null, 
        USER_RESPONSE_MESSAGES.user_logout_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_logout_fail
      );
    }
  }


  async googleLogin(googleLoginDto:  GoogleLoginDto) {
    const decoded = jwtDecode(googleLoginDto.credential);
    const userId = googleLoginDto.clientId;
    console.log(decoded)
    console.log(userId)
  }
}