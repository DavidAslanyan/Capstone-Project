import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/typeorm';
import { CoreModule } from './core/infrastructure/modules/core.module';
import { GatewayModule } from './user/presentation/gateways/gateway.module';
import { UserModule } from './user/infrastructure/modules/user.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    GatewayModule,
    CoreModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
