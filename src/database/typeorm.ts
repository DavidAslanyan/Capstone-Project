import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL');
  const parsedUrl = new URL(databaseUrl); 

  return {
    type: 'postgres',
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port),
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.split('/')[1],
    synchronize: false,
    logging: true,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../database/migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    ssl: true,
    extra: {
      max: 20,
      connectionTimeoutMillis: 20000,
    },
  };
};

