import { CoreModel } from "src/core/infrastructure/models/core.model";
import { DifficultyLevelEnum } from "../enums/difficulty-level.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { EmailValueObject } from "../value-objects/email.value-object";

export class UserModel extends CoreModel {
  private firstName: string;
  private lastName: string;
  private email: EmailValueObject;
  private password: string;
  private difficultyLevel: DifficultyLevelEnum;
  private role: UserRoleEnum;
  private status: UserStatusEnum;

  constructor(
    firstName: string,
    lastName: string,
    email: EmailValueObject,
    password: string,
    difficultyLevel: DifficultyLevelEnum,
    role: UserRoleEnum,
    status: UserStatusEnum,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.difficultyLevel = difficultyLevel;
    this.role = role;
    this.status = status;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): EmailValueObject {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getdifficultyLevel(): DifficultyLevelEnum {
    return this.difficultyLevel;
  }

  public getRole(): UserRoleEnum {
    return this.role;
  }

  public getStatus(): UserStatusEnum {
    return this.status;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setEmail(email: EmailValueObject): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setDifficultyLevel(difficultyLevel: DifficultyLevelEnum): void {
    this.difficultyLevel = difficultyLevel;
  }

  public setRole(role: UserRoleEnum): void {
    this.role = role;
  }

  public setStatus(status: UserStatusEnum): void {
    this.status = status;
  }

}

