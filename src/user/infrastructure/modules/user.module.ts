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
import { LoginUserCommandHanlder } from "src/user/application/cqrs/command-handlers/user/login-user.command.handler";
import { JwtModule } from "@nestjs/jwt";
import { ACCESS_TOKEN_EXPIRATION_TIME } from "src/utilities/constants/global-data";
import { config } from "dotenv";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenService } from "src/user/application/services/token.service";

config({ path: '.env' });

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService,
    TokenService,
    CreateUserCommandHandler,
    LoginUserCommandHanlder,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryHandler,
    }
  ],
  exports: [TypeOrmModule, JwtModule],
})
export class UserModule {}

