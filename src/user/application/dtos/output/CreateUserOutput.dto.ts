import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DifficultyLevelEnum } from "src/user/domain/enums/difficulty-level.enum";
import { UserRoleEnum } from "src/user/domain/enums/user-role.enum";


export class CreateUserOutputDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  difficultyLevel: DifficultyLevelEnum;

  @IsNotEmpty()
  @IsString()
  role: UserRoleEnum;
}

