import { CoreModel } from 'src/core/infrastructure/models/core.model';
import { UserModel } from './user.model';

export class AccessTokenModel extends CoreModel {
  private user: UserModel;
  private token: string;
  private expiresAt: Date;
  private isActive: boolean;

  constructor(
    user: UserModel,
    token: string,
    expiresAt: Date,
    isActive: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.user = user;
    this.token = token;
    this.expiresAt = expiresAt;
    this.isActive = isActive;
  }

  public getUser(): UserModel {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getIsTokenExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public isValid(): boolean {
    return this.isActive && !this.getIsTokenExpired();
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public setExpiresAt(expiresAt: Date): void {
    this.expiresAt = expiresAt;
  }

  public setIsActiveStatus(isActive: boolean): void {
    this.isActive = isActive;
  }

  public deactivateToken(): void {
    this.isActive = false;
  }

}
