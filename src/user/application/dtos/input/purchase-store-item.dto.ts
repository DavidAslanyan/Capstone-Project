import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PurchaseStoreItemDto {
  @IsNotEmpty()
  @IsString()
  item: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  coins: number;
}

