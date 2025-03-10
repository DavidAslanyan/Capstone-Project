import { IsNotEmpty } from "class-validator";


export class ChangeDifficultyLevelDto {
  @IsNotEmpty()
  level: string
}

