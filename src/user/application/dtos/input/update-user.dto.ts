import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DifficultyLevelEnum } from "src/user/domain/enums/difficulty-level.enum";


export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @IsNotEmpty()
  @IsString()
  frameUrl: string;

  @IsNotEmpty()
  @IsString()
  backgroundUrl: string;

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
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  difficultyLevel: DifficultyLevelEnum;
}

