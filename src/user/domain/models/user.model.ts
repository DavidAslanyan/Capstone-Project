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
  private points: number;
  private gamesPassed: string[];
  private avatar: string;
  private frame: string;
  private background: string;
  private avatarsPurchased: string[];
  private framesPurchased: string[];
  private backgroundsPurchased: string[];

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
    points: number,
    gamesPassed: string[],
    avatar: string,
    frame: string,
    background: string,
    avatarsPurchased: string[],
    framesPurchased: string[],
    backgroundsPurchased: string[],
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
    this.points = points;
    this.gamesPassed = gamesPassed;
    this.avatar = avatar;
    this.frame = frame;
    this.background = background;
    this.avatarsPurchased = avatarsPurchased;
    this.framesPurchased = framesPurchased;
    this.backgroundsPurchased = backgroundsPurchased;
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

  public getPoints(): number {
    return this.points;
  }

  public getGamesPassed(): string[] {
    return this.gamesPassed;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getFrame(): string {
    return this.frame;
  }

  public getBackground(): string {
    return this.background;
  }

  public getAvatarsPurchased(): string[] {
    return this.avatarsPurchased;
  }

  public getFramesPurchased(): string[] {
    return this.framesPurchased;
  }

  public getBackgroundsPurchased(): string[] {
    return this.backgroundsPurchased;
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

  public setPoints(points: number): void {
    this.points = points;
  }

  public setGamesPassed(gamesPassed: string[]): void {
    this.gamesPassed = gamesPassed;
  }

  public setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public setFrame(frame: string): void {
    this.frame = frame;
  }

  public setBackground(background: string): void {
    this.background = background;
  }

  public setAvatarsPurchased(avatars: string[]): void {
    this.avatarsPurchased = avatars;
  }

  public setFramesPurchased(frames: string[]): void {
    this.framesPurchased = frames;
  }

  public setBackgroundsPurchased(backgrounds: string[]): void {
    this.backgroundsPurchased = backgrounds;
  }

}

