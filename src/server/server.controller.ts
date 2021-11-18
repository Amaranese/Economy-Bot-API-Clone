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
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ErrorDto } from 'src/dto/error.dto';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post('')
  async create(@Body() createServerDto: CreateServerDto) {
    return await this.serverService
      .createServer(createServerDto)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Get(':serverId')
  async getServerByDiscordId(@Param('serverId') serverId: string) {
    return await this.serverService
      .getServerByDiscordId(serverId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  // @Get()
  // findAll() {
  //   return this.serverService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serverService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
  //   return this.serverService.update(+id, updateServerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serverService.remove(+id);
  // }
}
