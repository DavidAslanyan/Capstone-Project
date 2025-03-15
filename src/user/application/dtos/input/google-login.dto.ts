import { IsNotEmpty, IsString } from "class-validator";


export class GoogleLoginDto {
  @IsNotEmpty()
  @IsString()
  credential: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;
}

