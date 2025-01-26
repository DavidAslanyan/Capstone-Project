import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSourceOptions } from './database/typeorm';
import { CoreModule } from './core/infrastructure/modules/core.module';
import { UserModule } from './user/infrastructure/modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    CoreModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => {
        return createDataSourceOptions(configService);
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
