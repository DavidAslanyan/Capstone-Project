import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/user/domain/models/user.model";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { UserStatusEnum } from "src/user/domain/enums/user-status.enum";
import { BadRequestException, NotFoundException } from "@nestjs/common";


export class UserRepositoryHandler implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  
  async create(user: UserModel): Promise<UserModel> {
    const userEntity = UserMapper.toEntity(user);
    const savedUserEntity = await this.repository.save(userEntity);

    return UserMapper.toModel(savedUserEntity);
  }

  async getUserWithEmail(email: string): Promise<UserModel | null> {
    const user = await this.repository.findOne({
      where: { email }
    });

    return user ? UserMapper.toModel(user) : null;
  }

  async updateUserStatus(userId: string, status: UserStatusEnum): Promise<UserModel | null> {
    const user = await this.repository.findOne({
      where: { id: userId }
    });

    if (user) {
      user.status = status;
      const updatedUser = await this.repository.save(user);

      return UserMapper.toModel(updatedUser);
    }
  }

  async doesUserExistWithEmail(email: string): Promise<boolean> {
    const dublicateEmailCount = await this.repository.count({
      where: { email },
    });

    return dublicateEmailCount > 0;
  }

  async getUserById(id: string): Promise<UserModel | null> {
    const user = await this.repository.findOne({
      where: { id, status: UserStatusEnum.ACTIVE }
    });

    return user ? UserMapper.toModel(user) : null;
  }

  async updateUser(id: string, userModel: UserModel): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      return null; 
    }

    const userEntity = UserMapper.toEntity(userModel);
    await this.repository.update(id, userEntity);

    return userModel;
  }

  async updateUserProgress(id: string, progress: number): Promise<UserModel | null> {
    const user = await this.repository.findOne({
      where: { id }
    });

    if (user) {
      user.progress = progress;
      const updatedUser = await this.repository.save(user);

      return UserMapper.toModel(updatedUser);
    }
  }

  async addUserProgress(id: string, progress: number): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.progress += progress;
    const updatedUser = await this.repository.save(user);

    return UserMapper.toModel(updatedUser);
  }

  async addGamePassed(id: string, gamePassed: string): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.games_passed.includes(gamePassed)) {
      throw new BadRequestException("Game already added");
    }

    user.games_passed.push(gamePassed);
    const updatedUser = await this.repository.save(user);

    return UserMapper.toModel(updatedUser);
  }

  async clearPassedGames(id: string): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.games_passed = [];
    const updatedUser = await this.repository.save(user);

    return UserMapper.toModel(updatedUser);
  }


  async addUserCoins(id: string, coins: number): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: { id }
    });

    if (user) {
      user.coins = user.coins + coins < 0 ? 0 : user.coins + coins;
      const updatedUser = await this.repository.save(user);

      return UserMapper.toModel(updatedUser);
    }
  }
  
  

}

