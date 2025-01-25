import { CreateUserDto } from "src/user/application/dtos/input/CreateUser.dto";


export class CreateUserCommand {
  constructor(public readonly createUserInputDto: CreateUserDto) {}
}
