import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddStoreItemCommand } from "../../commands/progress/add-store-item.command";
import { Inject} from "@nestjs/common";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { StoreItemEnum } from "src/utilities/enums/store-item.enum";
import { UserModel } from "src/user/domain/models/user.model";


@CommandHandler(AddStoreItemCommand)
export class AddStoreItemCommandHandler implements ICommandHandler<AddStoreItemCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: AddStoreItemCommand): Promise<UserModel> {
    const { userId, purchaseStoreItemDto, queryRunner } = command;
    let updatedUser: UserModel;

    if (purchaseStoreItemDto.type === StoreItemEnum.AVATAR) {
      updatedUser = await this.userRepository.addPurchasedAvatar(userId, purchaseStoreItemDto.item, queryRunner);
    }

    if (purchaseStoreItemDto.type === StoreItemEnum.FRAME) {
      updatedUser = await this.userRepository.addPurchasedFrame(userId, purchaseStoreItemDto.item, queryRunner);
    }

    if (purchaseStoreItemDto.type === StoreItemEnum.BACKGROUND) {
      updatedUser = await this.userRepository.addPurchasedBackground(userId, purchaseStoreItemDto.item, queryRunner);
    }

    return updatedUser;
  }

}