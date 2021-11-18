import { Module } from '@nestjs/common';
import { UserServerItemService } from './user-server-item.service';
import { UserServerItemController } from './user-server-item.controller';
import { ItemsModule } from 'src/items/items.module';
import { UserServerModule } from 'src/user-server/user-server.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerItem } from './entities/user-server-item.entity';
import { UserServer } from 'src/user-server/entities/user_server.entity';

@Module({
  imports: [
    ItemsModule,
    UserServerModule,
    TypeOrmModule.forFeature([UserServerItem]),
    TypeOrmModule.forFeature([UserServer]),
  ],
  controllers: [UserServerItemController],
  providers: [UserServerItemService],
})
export class UserServerItemModule {}
