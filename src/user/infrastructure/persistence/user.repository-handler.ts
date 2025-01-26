import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/user/domain/models/user.model";
import { IUserRepository } from "src/user/domain/repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { UserStatusEnum } from "src/user/domain/enums/user-status.enum";


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
      where: { id }
    });

    return user ? UserMapper.toModel(user) : null;
  }

}

