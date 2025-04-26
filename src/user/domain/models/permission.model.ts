import { CoreModel } from "src/core/infrastructure/models/core.model";

export class PermissionModel extends CoreModel {
  private title: string;
  private description: string;

  constructor(
    title: string,
    description: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.description = description;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setTitle(title: string) {
    this.title = title;
  }
  
  public setDescription(description: string) {
    this.description = description;
  }

}