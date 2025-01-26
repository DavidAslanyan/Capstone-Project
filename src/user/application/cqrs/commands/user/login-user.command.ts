import { LoginUserDto } from "src/user/application/dtos/input/LoginUser.dto";


export class LoginUserCommand {
  constructor(public readonly loginUserInputDto: LoginUserDto) {}
}
