import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";
import { UpdateProgressCommand } from "../../commands/user/update-progress.command";


@CommandHandler(UpdateProgressCommand)
export class UpdateProgressCommandHanlder implements ICommandHandler<UpdateProgressCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateProgressCommand) {
    const userId = command.userId;
    const progress = command.updateUserProgressDto.progress;

    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.user_not_found);
    }

    const updatedUser = await this.userRepository.updateUserProgress(userId, progress);

    return updatedUser;
  }
}

