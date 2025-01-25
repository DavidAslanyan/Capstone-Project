import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/input/CreateUser.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserModel } from "src/user/domain/models/user.model";
import { CreateUserCommand } from "../cqrs/commands/user/create-user.command";
import { CustomResponse } from "../responses/custom-response.dto";
import { USER_RESPONSE_MESSAGES } from "src/utilities/constants/response-messages";
import { formatUserOutput } from "src/utilities/functions/format-user-output";


@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const userCommand = new CreateUserCommand(createUserDto);
      const user: UserModel = await this.commandBus.execute(userCommand);
      const userOutput = formatUserOutput(user);
  
      return new CustomResponse(
        HttpStatus.CREATED, 
        userOutput, 
        null, 
        USER_RESPONSE_MESSAGES.user_create_success
      );
    } catch(error) {
      return new CustomResponse(
        error.status, 
        null, 
        error.message, 
        USER_RESPONSE_MESSAGES.user_create_fail
      );
    }
    
  }
}

