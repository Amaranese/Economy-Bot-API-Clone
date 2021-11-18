import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { StoreModule } from 'src/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), StoreModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
