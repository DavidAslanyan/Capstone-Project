import { UserStatusEnum } from "../enums/user-status.enum";
import { UserModel } from "../models/user.model";


export interface IUserRepository {
  create(user: UserModel): Promise<UserModel>;
  getUserWithEmail(email: string): Promise<UserModel>
  doesUserExistWithEmail(email: string): Promise<boolean>;
  updateUserStatus(userId: string, status: UserStatusEnum): Promise<UserModel | null>,
  getUserById(id: string): Promise<UserModel | null>,
  updateUserProgress(id: string, progress: number): Promise<UserModel | null>,
  updateUser(id: string, userModel: UserModel): Promise<UserModel>,
  addGamePassed(id: string, gamePassed: string): Promise<UserModel>,
  clearPassedGames(id: string): Promise<UserModel>
  addUserCoins(id: string, coins: number): Promise<UserModel>,
  addUserProgress(id: string, progress: number): Promise<UserModel>,
  subtractUserCoins(id: string, coins: number): Promise<UserModel>
}

