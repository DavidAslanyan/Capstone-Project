import { IsNotEmpty, IsNumber } from "class-validator";

export class AddUserPointsDto {
  @IsNotEmpty()
  @IsNumber()
  points: number;
}

