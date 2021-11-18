import { join } from 'path';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as constants from './constants';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env[constants.DATABASE_HOST],
    port: parseInt(process.env[constants.DATABASE_PORT], 10),
    database: process.env[constants.DATABASE_NAME],
    username: process.env[constants.DATABASE_USERNAME],
    password: process.env[constants.DATABASE_PASSWORD],
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,

    migrationsRun: false,
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: 'src/migration',
    },

    // Activate ONLY MANUALLY in DEVELOPMENT IF NECESSARY (DEACTIVATE IN PRODUCTION).
    synchronize: true,
    logging: true,
    logger: 'file',
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
