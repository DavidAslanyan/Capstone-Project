import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "../../commands/user/login-user.command";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { ERROR_MESSAGES } from "src/utilities/constants/response-messages";
import { PasswordService } from "src/user/application/services/password.service";
import { UserModel } from "src/user/domain/models/user.model";


@CommandHandler(LoginUserCommand)
export class LoginUserCommandHanlder implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: LoginUserCommand): Promise<UserModel> {
    const email = command.loginUserInputDto.email;
    const password = command.loginUserInputDto.password;

    const existingUser = await this.userRepository.getUserWithEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.invalid_credentials);
    }

    const passwordVerified = await this.passwordService.verifyPassword(password, existingUser.getPassword());
    if (!passwordVerified) {
      throw new UnauthorizedException(ERROR_MESSAGES.invalid_credentials);
    }

    return existingUser;
  }
}

