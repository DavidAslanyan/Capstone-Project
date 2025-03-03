import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";


@Injectable()
export class ProgressService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  
  async updateGamesPassed(userId: string, gamesPassed: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updatedUser = await this.userRepository.updateUserGamesPassed(userId, gamesPassed);

    return updatedUser;
  }
}

