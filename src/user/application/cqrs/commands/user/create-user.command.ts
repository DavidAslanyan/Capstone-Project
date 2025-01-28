import { CreateUserDto } from "src/user/application/dtos/input/create-user.dto";


export class CreateUserCommand {
  constructor(public readonly createUserInputDto: CreateUserDto) {}
}
