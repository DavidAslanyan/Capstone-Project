import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../commands/user/create-user.command";
import { Inject } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { UserModel } from "src/user/domain/models/user.model";
import { UserRoleEnum } from "src/user/domain/enums/user-role.enum";
import { UserStatusEnum } from "src/user/domain/enums/user-status.enum";
import { EmailValueObject } from "src/user/domain/value-objects/email.value-object";
import { PasswordService } from "src/user/application/services/password.service";
import { DuplicateValueException } from "src/user/application/exceptions/duplicate-value.exception";


@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand>{
  private readonly userDefaultRole = UserRoleEnum.USER;
  private readonly userDefaultStatus = UserStatusEnum.INACTIVE;
  private readonly initialProgress = 0;
  private readonly initialCoins = 0;
  private readonly initialGamesPassed = 0;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}
  
  async execute(command: CreateUserCommand): Promise<UserModel> {
      const hashedPassword = await this.passwordService.hashPassword(command.createUserInputDto.password);

      const userModel = new UserModel(
        command.createUserInputDto.firstName,
        command.createUserInputDto.lastName,
        EmailValueObject.create(command.createUserInputDto.email),
        hashedPassword,
        command.createUserInputDto.difficultyLevel,
        this.userDefaultRole,
        this.userDefaultStatus,
        this.initialProgress,
        this.initialCoins,
        this.initialGamesPassed
      ); 
      
      const email = command.createUserInputDto.email;
      const userWithDuplicateEmail = await this.userRepository.doesUserExistWithEmail(email);

      if (userWithDuplicateEmail) {
        throw new DuplicateValueException(
          `User with email: '${email}' already exists`,
        );
      }

      const createdUser = await this.userRepository.create(userModel);

      return createdUser;
  }
}

