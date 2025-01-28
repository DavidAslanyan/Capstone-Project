import { IsNotEmpty, IsNumber } from "class-validator";


export class UpdateUserProgressDto {
  @IsNotEmpty()
  @IsNumber()
  progress: number;
}

