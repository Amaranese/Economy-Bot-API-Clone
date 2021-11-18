import { Module } from '@nestjs/common';
import { UserServerService } from './user-server.service';
import { UserServerController } from './user-server.controller';
import { ServerModule } from 'src/server/server.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServer } from './entities/user_server.entity';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    ServerModule,
    UserModule,
    TypeOrmModule.forFeature([UserServer]),
    ItemsModule,
  ],
  controllers: [UserServerController],
  providers: [UserServerService],
  exports: [UserServerService],
})
export class UserServerModule {}
