import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DifficultyLevelEnum } from "src/user/domain/enums/difficulty-level.enum";


export class CreateUserDto {
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
  password: string;

  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @IsNotEmpty()
  @IsString()
  difficultyLevel: DifficultyLevelEnum;
}

