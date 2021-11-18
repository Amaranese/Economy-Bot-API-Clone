import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as morgan from 'morgan';

import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ItemsModule } from './items/items.module';
import { UserServerModule } from './user-server/user-server.module';
import { ServerSettingsModule } from './server-settings/server-settings.module';
import { UserServerItemModule } from './user-server-item/user-server-item.module';
import { VerifyBotToken } from './middlewares/verifyBotToken.middleware';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    UserModule,
    ServerModule,
    ServerSettingsModule,
    UserServerModule,
    StoreModule,
    ItemsModule,
    UserServerItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev'), VerifyBotToken)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
