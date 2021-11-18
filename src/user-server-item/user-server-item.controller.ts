import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserServerItemService } from './user-server-item.service';
import { CreateUserServerItemDto } from './dto/create-user-server-item.dto';
import { UpdateUserServerItemDto } from './dto/update-user-server-item.dto';

@Controller('user-server-item')
export class UserServerItemController {
  constructor(private readonly userServerItemService: UserServerItemService) {}

  @Post('/buy')
  async buyItems(
    @Body() b: { serverId: string; userId: string; itemId: string },
  ) {
    await this.userServerItemService.buyItems(b);
  }

  @Post('/use')
  async useItem(
    @Body() b: { serverId: string; userId: string; itemId: string },
  ) {
    return await this.userServerItemService.useItems(b);
  }

  // @Post()
  // create(@Body() createUserServerItemDto: CreateUserServerItemDto) {
  //   return this.userServerItemService.create(createUserServerItemDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userServerItemService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userServerItemService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserServerItemDto: UpdateUserServerItemDto) {
  //   return this.userServerItemService.update(+id, updateUserServerItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userServerItemService.remove(+id);
  // }
}
