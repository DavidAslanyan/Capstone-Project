import { UpdateUserProgressDto } from "src/user/application/dtos/input/update-user-progress.dto";


export class UpdateProgressCommand {
  constructor(
    public readonly updateUserProgressDto: UpdateUserProgressDto,
    public readonly userId: string
  ) {}
}
