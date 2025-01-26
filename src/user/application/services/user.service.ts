import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/input/CreateUser.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserModel } from "src/user/domain/models/user.model";
import { CreateUserCommand } from "../cqrs/commands/user/create-user.command";
import { CustomResponse } from "../responses/custom-response.dto";
import { USER_RESPONSE_MESSAGES } from "src/utilities/constants/response-messages";
import { formatUserOutput } from "src/utilities/functions/format-user-output";
import { LoginUserDto } from "../dtos/input/LoginUser.dto";
import { LoginUserCommand } from "../cqrs/commands/user/login-user.command";
import { TokenService } from "./token.service";
import { GetUserByIdQuery } from "../cqrs/queries/user/get-by-id.query";


@Injectable()
export class UserService {
  constructor(
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

      const userOutput = {
        user: formatUserOutput(user),
        accessToken,
        refreshToken
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

  async getUser(userId: string) {
    try {
      const userQuery = new GetUserByIdQuery(userId);
      const user: UserModel = await this.queryBus.execute(userQuery);
      const userOutput = formatUserOutput(user);

      return new CustomResponse(
        HttpStatus.FOUND, 
        userOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_get_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_get_fail
      );
    }
  }
}

