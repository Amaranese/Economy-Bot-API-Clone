import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerSettings } from 'src/server-settings/entities/server-settings.entity';
import { ServerService } from 'src/server/server.service';
import { Repository } from 'typeorm';
import { CreateServerSettingDto } from './dto/create-server-setting.dto';
import { UpdateServerSettingDto } from './dto/update-server-setting.dto';

@Injectable()
export class ServerSettingsService {
  constructor(
    @InjectRepository(ServerSettings)
    private serverSettingsRespository: Repository<ServerSettings>,

    @Inject(ServerService)
    private serverService: ServerService,
  ) {}

  async setConfigColumn(
    configColumn: ConfigColumnDto,
    id: string,
  ): Promise<void | Error> {
    try {
      const server = await this.serverService.getServerByDiscordId(id);

      const serverSettings = await this.serverSettingsRespository
        .findOneOrFail(server.serverSettings.id)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.BAD_REQUEST,
            'server settings not found',
          );
        });

      serverSettings[configColumn.columnName] = configColumn.newValue;
      this.serverSettingsRespository.save(serverSettings);
    } catch (err) {
      throw err;
    }
  }

  async getConfigColumn(nameColumn: string, id: string): Promise<{}> {
    try {
      const server = await this.serverService.getServerByDiscordId(id);
      const serverSettings = await this.serverSettingsRespository
        .findOneOrFail(server.serverSettings.id)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.BAD_REQUEST,
            'server settings not found',
          );
        });
      return serverSettings[nameColumn];
    } catch (err) {
      throw err;
    }
  }

  // findAll() {
  //   return `This action returns all serverSettings`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} serverSetting`;
  // }

  // update(id: number, updateServerSettingDto: UpdateServerSettingDto) {
  //   return `This action updates a #${id} serverSetting`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} serverSetting`;
  // }
}
