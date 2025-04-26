import { CoreModel } from "src/core/infrastructure/models/core.model";
import { UserRoleEnum } from "../enums/user-role.enum";

export class RoleModel extends CoreModel {
  private title: UserRoleEnum;
  private description: string;

  constructor(
    title: UserRoleEnum,
    description: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.description = description;
  }

  public getTitle(): UserRoleEnum {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setTitle(title: UserRoleEnum) {
    this.title = title;
  }
  
  public setDescription(description: string) {
    this.description = description;
  }

}