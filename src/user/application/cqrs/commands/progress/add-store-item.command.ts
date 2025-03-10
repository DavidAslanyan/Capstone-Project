import { PurchaseStoreItemDto } from "src/user/application/dtos/input/purchase-store-item.dto";
import { QueryRunner } from "typeorm";

export class AddStoreItemCommand {
  constructor(
    public readonly userId: string,
    public readonly purchaseStoreItemDto: PurchaseStoreItemDto,
    public readonly queryRunner: QueryRunner,
  ) {}
}
