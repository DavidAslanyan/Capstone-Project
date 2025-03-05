import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { UserModel } from "src/user/domain/models/user.model";
import { UserStatusEnum } from "src/user/domain/enums/user-status.enum";
import { EmailValueObject } from "src/user/domain/value-objects/email.value-object";
import { PasswordService } from "src/user/application/services/password.service";
import { UpdateUserCommand } from "../../commands/user/update-user.command";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";


@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand>{
  private readonly userDefaultStatus = UserStatusEnum.ACTIVE;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}
  
  async execute(command: UpdateUserCommand): Promise<UserModel> {
    const userId = command.userId;

    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.user_not_found);
    }

    const passwordVerified = await this.passwordService.verifyPassword(command.updateUserDto.oldPassword, existingUser.getPassword());
    if (!passwordVerified) {
      throw new UnauthorizedException(ERROR_MESSAGES.invalid_credentials);
    }

    const hashedPassword = await this.passwordService.hashPassword(command.updateUserDto.newPassword);

    const userModel = new UserModel(
      command.updateUserDto.firstName,
      command.updateUserDto.lastName,
      EmailValueObject.create(command.updateUserDto.email),
      hashedPassword,
      command.updateUserDto.difficultyLevel,
      existingUser.getRole(),
      this.userDefaultStatus,
      existingUser.getProgress(),
      existingUser.getCoins(),
      existingUser.getGamesPassed()
    );

    const updatedUser = await this.userRepository.updateUser(userId, userModel);

    return updatedUser;
  }
}

