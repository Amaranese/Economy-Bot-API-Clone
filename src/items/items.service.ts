import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreService } from 'src/store/store.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @Inject(StoreService)
    private storeService: StoreService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    const store = await this.storeService.findOneByDiscordId(
      createItemDto?.serverId,
    );
    item.store = store;
    await this.itemRepository.save(item);

    console.log(createItemDto.serverId.toString());
  }

  // findAll() {
  //   return `This action returns all items`;
  // }

  async findOne(id: number) {
    return await this.itemRepository.findOneOrFail(id);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    return this.itemRepository.merge(item, updateItemDto);
  }

  remove(id: number) {
    this.itemRepository.delete(id);
  }
}
