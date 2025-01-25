import { UserModel } from "../models/user.model";


export interface IUserRepository {
  create(user: UserModel): Promise<UserModel>;
  getUserWithEmail(email: string): Promise<boolean>
}

