import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { GAMES } from "src/utilities/constants/game-titles";
import { ERROR_MESSAGES, USER_RESPONSE_MESSAGES } from "src/utilities/constants/response-messages";
import { CustomResponse } from "../responses/custom-response.dto";
import { UpdateProgressCommand } from "../cqrs/commands/user/update-progress.command";
import { UserModel } from "src/user/domain/models/user.model";
import { formatUserOutput } from "src/utilities/functions/format-user-output";
import { UpdateUserProgressDto } from "../dtos/input/update-user-progress.dto";
import { CommandBus } from "@nestjs/cqrs";


@Injectable()
export class ProgressService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly commandBus: CommandBus,
  ) {}

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

  async addProgress(userId: string, updateUserProgressDto: UpdateUserProgressDto) {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundException("User not found");
      }
  
      if (updateUserProgressDto.progress <= 0) {
        throw new BadRequestException("Progress must be hgiher than zero");
      }
  
      const updatedUser = await this.userRepository.addUserProgress(userId, updateUserProgressDto.progress);
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
  
  async addGamePassed(userId: string, gamePassed: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (!GAMES.includes(gamePassed)) {
        throw new BadRequestException(ERROR_MESSAGES.invalid_game);
      }

      const updatedUser = await this.userRepository.addGamePassed(userId, gamePassed);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_add_game_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_add_game_fail
      );
    }
    
  }

  async clearPassedGames(userId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const clearedGames = await this.userRepository.clearPassedGames(userId);
      const updatedUserOutput = formatUserOutput(clearedGames);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_clear_game_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_clear_game_fail
      );
    }
  }

  async addUserCoins(userId: string, coins: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updatedUser = await this.userRepository.addUserCoins(userId, coins);

    return updatedUser;
  }
}

