import { BadRequestException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/input/create-user.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserModel } from "src/user/domain/models/user.model";
import { CreateUserCommand } from "../cqrs/commands/user/create-user.command";
import { CustomResponse } from "../responses/custom-response.dto";
import { USER_RESPONSE_MESSAGES } from "src/utilities/constants/response-messages";
import { formatUserOutput } from "src/utilities/functions/format-user-output";
import { LoginUserDto } from "../dtos/input/login-user.dto";
import { LoginUserCommand } from "../cqrs/commands/user/login-user.command";
import { TokenService } from "./token.service";
import { GetUserByIdQuery } from "../cqrs/queries/user/get-by-id.query";
import { UpdateUserProgressDto } from "../dtos/input/update-user-progress.dto";
import { UpdateProgressCommand } from "../cqrs/commands/user/update-progress.command";
import { UpdateUserDto } from "../dtos/input/update-user.dto";
import { UpdateUserCommand } from "../cqrs/commands/user/update-user.command";
import { DeleteUserCommand } from "../cqrs/commands/user/delete-user.command";
import { ChangeDifficultyLevelDto } from "../dtos/input/change-difficulty-level.dto";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { DifficultyLevelEnum } from "src/user/domain/enums/difficulty-level.enum";


@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService
  ) {}


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
  
  async getUsersList() {
    try {
      const users = await this.userRepository.getUsersList();
      const usersOutput = users.map((user) => formatUserOutput(user));

      return new CustomResponse(
        HttpStatus.FOUND, 
        usersOutput, 
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

  async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    try {
      const userCommand = new UpdateUserCommand(updateUserDto, userId);
      const updatedUser: UserModel = await this.commandBus.execute(userCommand);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_update_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_update_fail
      );
    }
  }

  async deleteUser(userId: string) {
    try {
      const userCommand = new DeleteUserCommand(userId);
      const updatedUser: UserModel = await this.commandBus.execute(userCommand);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_delete_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_delete_fail
      );
    }
  }

  async updateUserProgress(updateUserProgressDto: UpdateUserProgressDto, userId: string) {
    try {
      const userCommand = new UpdateProgressCommand(updateUserProgressDto, userId);
      const updatedUser: UserModel = await this.commandBus.execute(userCommand);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_update_progress_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_update_progress_fail
      );
    }
  }

  async changeDiffcultyLevel(userId: string, difficultyLevelDto: ChangeDifficultyLevelDto) {
    try {
      const { level } = difficultyLevelDto;
      if (level !== DifficultyLevelEnum.EASY &&
          level !== DifficultyLevelEnum.MEDIUM &&
          level !== DifficultyLevelEnum.HARD
      ) {
        throw new BadRequestException("Incorrect Difficlty level");
      }
  
      const updatedUserWithDifficulty = await this.userRepository.changeDifficultyLevel(userId, level);
      const updatedUserOutput = formatUserOutput(updatedUserWithDifficulty);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.difficulty_change_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.difficulty_change_fail
      );
    }
    
  }
}

