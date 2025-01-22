import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/typeorm';
import { CoreModule } from './core/infrastructure/modules/core.module';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
