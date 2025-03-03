import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateGamesPassedDto {
  @IsNotEmpty()
  @IsNumber()
  gamesPassed: number;
}

