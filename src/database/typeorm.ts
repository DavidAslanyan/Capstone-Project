import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

config({ path: '.env' });

export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    synchronize: false,
    logging: true,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../database/migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    ssl: false,
    extra: {
      max: 20,
      connectionTimeoutMillis: 20000,
    },
  };
};

const configService = new ConfigService();
export const AppDataSource = new DataSource(
  createDataSourceOptions(configService),
);
