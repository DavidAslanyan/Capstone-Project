import { UpdateUserDto } from "src/user/application/dtos/input/update-user.dto";


export class UpdateUserCommand {
  constructor(
    public readonly updateUserDto: UpdateUserDto,
    public readonly userId: string
  ) {}
}
