import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerSettings } from 'src/server-settings/entities/server-settings.entity';
import { Server } from 'src/server/entities/server.entity';
import { Repository } from 'typeorm';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverRepository: Repository<Server>,

    @InjectRepository(ServerSettings)
    private serverSettingsRespository: Repository<ServerSettings>,
  ) {}

  async createServer(newServer: CreateServerDto): Promise<void> {
    console.log(newServer);
    try {
      if (!newServer)
        throw new ErrorDto(
          HttpStatus.BAD_REQUEST,
          'not enought data, server must have discordId and name',
        );
      const server = await this.serverRepository.create(newServer);
      await this.serverRepository.save(server).catch(() => {
        throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
      });
      const serverSettings = await this.serverSettingsRespository.create();
      await this.serverSettingsRespository.save(serverSettings).catch(() => {
        throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
      });

      server.serverSettings = serverSettings;
      await this.serverRepository.save(server).catch(() => {
        throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
      });
    } catch (err) {
      throw err;
    }
  }

  async getServerByDiscordId(serverId: string): Promise<Server> {
    try {
      const server = this.serverRepository
        .findOneOrFail({
          where: { serverId: serverId },
          relations: ['serverSettings', 'store'],
        })
        .catch(() => {
          throw new ErrorDto(HttpStatus.NOT_FOUND, 'server not found');
        });

      return server;
    } catch (err) {}
  }

  // findAll() {
  //   return `This action returns all server`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} server`;
  // }

  // update(id: number, updateServerDto: UpdateServerDto) {
  //   return `This action updates a #${id} server`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} server`;
  // }
}
