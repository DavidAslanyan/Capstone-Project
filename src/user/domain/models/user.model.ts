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
  private progress: number;
  private coins: number;
  private gamesPassed: number;

  constructor(
    firstName: string,
    lastName: string,
    email: EmailValueObject,
    password: string,
    difficultyLevel: DifficultyLevelEnum,
    role: UserRoleEnum,
    status: UserStatusEnum,
    progress: number,
    coins: number,
    gamesPassed: number,
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
    this.progress = progress;
    this.coins = coins;
    this.gamesPassed = gamesPassed;
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

  public getDifficultyLevel(): DifficultyLevelEnum {
    return this.difficultyLevel;
  }

  public getRole(): UserRoleEnum {
    return this.role;
  }

  public getStatus(): UserStatusEnum {
    return this.status;
  }

  public getProgress(): number {
    return this.progress;
  }

  public getCoins(): number {
    return this.coins;
  }

  public getGamesPassed(): number {
    return this.gamesPassed;
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

  public setProgress(progress: number): void {
    this.progress = progress;
  }

  public setCoins(coins: number): void {
    this.coins = coins;
  }

  public setGamesPassed(gamesPassed: number): void {
    this.gamesPassed = gamesPassed;
  }

}

