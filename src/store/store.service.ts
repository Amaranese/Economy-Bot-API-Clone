import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerService } from 'src/server/server.service';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @Inject(ServerService)
    private serverService: ServerService,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const server = await this.serverService.getServerByDiscordId(
      createStoreDto.serverId,
    );
    // console.log(server)
    if (!server.store) {
      const store = this.storeRepository.create();
      store.server = server;
      this.storeRepository.save(store);
      return;
    }
    throw new ErrorDto(HttpStatus.BAD_REQUEST, 'alredy created');
  }

  // findAll() {
  //   return `This action returns all store`;
  // }

  async findOneByDiscordId(id: string) {
    const server = await this.serverService.getServerByDiscordId(id);
    return await this.storeRepository
      .findOneOrFail({
        where: { server },
        relations: ['items'],
      })
      .catch((err) => {
        throw new ErrorDto(HttpStatus.NOT_FOUND, 'not found');
      });
  }

  // update(id: number, updateStoreDto: UpdateStoreDto) {
  //   return `This action updates a #${id} store`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} store`;
  // }
}
