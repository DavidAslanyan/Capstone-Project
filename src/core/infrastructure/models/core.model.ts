export abstract class CoreModel {
  private id: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
