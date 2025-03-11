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
import { PurchaseStoreItemDto } from "../dtos/input/purchase-store-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Repository } from "typeorm";
import { AddStoreItemCommand } from "../cqrs/commands/progress/add-store-item.command";


@Injectable()
export class ProgressService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @InjectRepository(UserEntity)
    private readonly userDirectRepository: Repository<UserEntity>,
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
    try {
      if (coins <= 0) {
        throw new BadRequestException("Number must be hgiher than zero");
      }
  
      const updatedUser = await this.userRepository.addUserCoins(userId, coins);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_add_coins_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_add_coins_fail
      );
    }
    
  }

  async addUserPoints(userId: string, points: number) {
    try {
      if (points <= 0) {
        throw new BadRequestException("Number must be hgiher than zero");
      }
  
      const updatedUser = await this.userRepository.addPoints(userId, points);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_add_points_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_add_points_fail
      );
    }
    
  }

  async subtractUserCoins(userId: string, coins: number) {
    try {
      if (coins <= 0) {
        throw new BadRequestException("Number must be hgiher than zero");
      }

      const updatedUser = await this.userRepository.subtractUserCoins(userId, coins);
      const updatedUserOutput = formatUserOutput(updatedUser);

      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_subtract_coins_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_subtract_coins_fail
      );
    }
  }

  async purchaseStoreItem(userId: string, purchaseStoreItemDto: PurchaseStoreItemDto) {
    const queryRunner = this.userDirectRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.userRepository.purchaseStoreItemWithCoins(userId, purchaseStoreItemDto.coins, queryRunner);

      const addStoreItemCommand = new AddStoreItemCommand(
        userId,
        purchaseStoreItemDto,
        queryRunner,
      );
      const purchasedStoredUser: UserModel = await this.commandBus.execute(addStoreItemCommand);
      const updatedUserOutput = formatUserOutput(purchasedStoredUser);

      await queryRunner.commitTransaction();
      return new CustomResponse(
        HttpStatus.OK, 
        updatedUserOutput, 
        null, 
        USER_RESPONSE_MESSAGES.item_purchase_success
      );
    } catch(error) {
      await queryRunner.rollbackTransaction();
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.item_purchase_fail
      );
    } finally {
      await queryRunner.release();
    }
  }


}


