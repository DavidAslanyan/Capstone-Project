import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from "src/user/application/services/user.service";
import { UserController } from "src/user/presentation/controllers/user.controller";
import { UserEntity } from "../entities/user.entity";
import { AccessTokenEntity } from "../entities/access-token.entity";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";
import { RoleEntity } from "../entities/role.entity";
import { PermissionEntity } from "../entities/permission.entity";
import { PasswordService } from "src/user/application/services/password.service";
import { CreateUserCommandHandler } from "src/user/application/cqrs/command-handlers/user/create-user.command.handler";
import { UserRepositoryHandler } from "../persistence/user.repository-handler";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccessTokenEntity,
      RefreshTokenEntity,
      RoleEntity,
      PermissionEntity
    ]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService,
    CreateUserCommandHandler,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryHandler,
    }
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}

