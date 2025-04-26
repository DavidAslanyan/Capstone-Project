import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { UserModel } from "src/user/domain/models/user.model";
import { UserStatusEnum } from "src/user/domain/enums/user-status.enum";
import { UpdateUserCommand } from "../../commands/user/update-user.command";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";
import { DeleteUserCommand } from "../../commands/user/delete-user.command";


@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand>{
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  
  async execute(command: UpdateUserCommand): Promise<UserModel> {
    const userId = command.userId;

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.user_not_found);
    }

    const deletedUser = await this.userRepository.updateUserStatus(userId, UserStatusEnum.DELETED);

    return deletedUser;
  }
}

