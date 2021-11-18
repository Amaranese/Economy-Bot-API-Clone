import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ServerSettingsService } from './server-settings.service';
import { CreateServerSettingDto } from './dto/create-server-setting.dto';
import { UpdateServerSettingDto } from './dto/update-server-setting.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';

@Controller('server-settings')
export class ServerSettingsController {
  constructor(private readonly serverSettingsService: ServerSettingsService) {}

  @Put('/:id')
  async setConfigColumn(
    @Body() configColumn: ConfigColumnDto,
    @Param('id') id: string,
  ) {
    this.serverSettingsService
      .setConfigColumn(configColumn, id)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Get('/column/:serverId/:colunmName')
  async getConfigColumn(
    @Param('serverId') serverId: string,
    @Param('colunmName') columnName: string,
  ) {
    return this.serverSettingsService.getConfigColumn(columnName, serverId);
  }

  // @Get()
  // findAll() {
  //   return this.serverSettingsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serverSettingsService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateServerSettingDto: UpdateServerSettingDto) {
  //   return this.serverSettingsService.update(+id, updateServerSettingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serverSettingsService.remove(+id);
  // }
}
