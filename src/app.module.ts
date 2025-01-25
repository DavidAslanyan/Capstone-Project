import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/typeorm';
import { CoreModule } from './core/infrastructure/modules/core.module';
import { UserModule } from './user/infrastructure/modules/user.module';


@Module({
  imports: [
    CoreModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
