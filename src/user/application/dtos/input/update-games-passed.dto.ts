import { IsNotEmpty } from "class-validator";

export class AddGamePassedDto {
  @IsNotEmpty()
  gamePassed: string;
}

