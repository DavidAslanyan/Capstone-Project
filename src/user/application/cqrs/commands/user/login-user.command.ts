import { LoginUserDto } from "src/user/application/dtos/input/login-user.dto";


export class LoginUserCommand {
  constructor(public readonly loginUserInputDto: LoginUserDto) {}
}
