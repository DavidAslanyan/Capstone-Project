import { IsNotEmpty, IsNumber } from "class-validator";

export class AddUserCoinsDto {
  @IsNotEmpty()
  @IsNumber()
  coins: number;
}

