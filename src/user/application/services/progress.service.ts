import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { GAMES } from "src/utilities/constants/game-titles";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";


@Injectable()
export class ProgressService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  
  async addGamePassed(userId: string, gamePassed: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!GAMES.includes(gamePassed)) {
      throw new BadRequestException(ERROR_MESSAGES.invalid_game);
    }

    const updatedUser = await this.userRepository.addGamePassed(userId, gamePassed);

    return updatedUser;
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

