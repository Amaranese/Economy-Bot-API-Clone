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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ErrorDto } from 'src/dto/error.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto).catch((err: ErrorDto) => {
      throw new HttpException(err.message, err.status);
    });
  }

  // @Get()
  // findAll() {
  //   return this.storeService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOneByDiscordId(id).catch((err: ErrorDto) => {
      throw new HttpException(err.message, err.status);
    });
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
  //   return this.storeService.update(+id, updateStoreDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storeService.remove(+id);
  // }
}
