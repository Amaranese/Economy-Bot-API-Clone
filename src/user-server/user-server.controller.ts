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
import { UserServerService } from './user-server.service';
import { CreateUserServerDto } from './dto/create-user-server.dto';
import { UpdateUserServerDto } from './dto/update-user-server.dto';
import { ErrorDto } from 'src/dto/error.dto';

@Controller('user-server')
export class UserServerController {
  constructor(private readonly userServerService: UserServerService) {}

  @Post('/add/:serverId/:userId')
  async create(
    @Param('serverId') serverId: string,
    @Param('userId') userId: string,
  ) {
    await this.userServerService
      .create(serverId, userId)
      .catch((err: ErrorDto) => {
        throw new HttpException({ message: err.message }, err.status);
      });
  }

  @Put('/coins')
  async updateCoins(
    @Body()
    {
      customCoinsSet,
      serverId,
      userId,
    }: {
      customCoinsSet: number;
      serverId: string;
      userId: string;
    },
  ) {
    await this.userServerService
      .updateCoins(serverId, userId, customCoinsSet)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Put('/sharecoins')
  async shareCoins(
    @Body()
    {
      customCoinsSet,
      payedId,
      payerId,
      serverId,
    }: {
      customCoinsSet: number;
      payerId: string;
      payedId: string;
      serverId: string;
    },
  ) {
    try {
      await this.userServerService.shareCoins(
        serverId,
        payerId,
        payedId,
        customCoinsSet,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/coins/:userId/:serverId')
  async getUserCoins(
    @Param() { serverId, userId }: { serverId: string; userId: string },
  ) {
    return this.userServerService
      .getUserCoins(serverId, userId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  // @Get()
  // findAll() {
  //   return this.userServerService.findAll();
  // }

  @Get(':userId/:serverId')
  findOne(@Param() p: { userId: string; serverId: string }) {
    return this.userServerService.findOne(p.userId, p.serverId);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserServerDto: UpdateUserServerDto,
  // ) {
  //   return this.userServerService.update(+id, updateUserServerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userServerService.remove(+id);
  // }
}
