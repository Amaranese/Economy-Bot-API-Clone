import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorDto } from 'src/dto/error.dto';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import { ServerService } from 'src/server/server.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserServerDto } from './dto/create-user-server.dto';
import { UpdateUserServerDto } from './dto/update-user-server.dto';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class UserServerService {
  constructor(
    @InjectRepository(UserServer)
    private userServerRepository: Repository<UserServer>,

    @Inject(ServerService)
    private serverService: ServerService,

    @Inject(UserService)
    private userService: UserService,

    @Inject(ItemsService)
    private itemService: ItemsService,
  ) {}

  async create(serverId: string, userId: string): Promise<void> {
    try {
      const server = await this.serverService.getServerByDiscordId(serverId);
      const user = await this.userService.getUserByDiscordId(userId);

      if (
        await this.userServerRepository.findOne({
          where: { server: server, user: user },
        })
      ) {
        throw new ErrorDto(HttpStatus.BAD_REQUEST, 'userServer alredy created');
      }

      const userServer = await this.userServerRepository.create();

      userServer.server = server;
      userServer.user = user;
      userServer.coins = 0;
      await this.userServerRepository.save(userServer).catch(() => {
        throw new ErrorDto(HttpStatus.BAD_REQUEST, "couldn't save succesfully");
      });
    } catch (err) {
      throw err;
    }
  }
  async updateCoins(
    serverId: string,
    userId: string,
    customCoinsSet: number,
  ): Promise<void | Error> {
    try {
      const server = await this.serverService.getServerByDiscordId(serverId);
      const user = await this.userService.getUserByDiscordId(userId);
      const userServer = await this.userServerRepository
        .findOneOrFail({
          where: { server: server, user: user },
        })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            "relation between sever and user wasn't found",
          );
        });
      if (!customCoinsSet) {
        (await userServer).coins += 1;
      } else {
        (await userServer).coins += customCoinsSet;
      }
      this.userServerRepository.save(userServer).catch(() => {
        throw new ErrorDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "couldn't update coins",
        );
      });
    } catch (err) {
      throw err;
    }
  }

  async shareCoins(
    serverId: string,
    payerId: string,
    payedId: string,
    customCoinsSet: number,
  ): Promise<void> {
    try {
      const server = await this.serverService.getServerByDiscordId(serverId);
      const payer = await this.userService.getUserByDiscordId(payerId);
      const payed = await this.userService.getUserByDiscordId(payedId);
      const payerUserServer = await this.userServerRepository
        .findOneOrFail({ where: { server: server, user: payer } })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'payer userSever relation not found',
          );
        });
      const payedUserServer = await this.userServerRepository
        .findOneOrFail({
          where: { server: server, user: payed },
        })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'payerd userServer relation not found',
          );
        });

      if (payerUserServer.coins >= customCoinsSet && customCoinsSet >= 0) {
        payerUserServer.coins -= customCoinsSet;
        payedUserServer.coins += customCoinsSet;
        await this.userServerRepository.save(payedUserServer);
        await this.userServerRepository.save(payerUserServer);
      } else {
        throw new ErrorDto(
          HttpStatus.BAD_REQUEST,
          'no coins enoguth or the number was under 0',
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async getUserCoins(serverId: string, userId: string): Promise<{}> {
    try {
      const server = await this.serverService.getServerByDiscordId(serverId);
      const user = await this.userService.getUserByDiscordId(userId);
      const userServer = await this.userServerRepository
        .findOneOrFail({ where: { server: server, user: user } })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'the relation between the server and the user was not found',
          );
        });

      return { coins: userServer.coins };
    } catch (err) {
      throw err;
    }
  }

  // findAll() {
  //   return `This action returns all userServer`;
  // }

  async findOne(userId: string, serverId: string) {
    const server = await this.serverService.getServerByDiscordId(serverId);
    const user = await this.userService.getUserByDiscordId(userId);
    const userServer = await this.userServerRepository.findOneOrFail({
      where: { server, user },
      relations: ['userServerItem', 'server', 'user', 'userServerItem.item'],
    });
    return userServer;
  }

  // update(id: number, updateUserServerDto: UpdateUserServerDto) {
  //   return `This action updates a #${id} userServer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userServer`;
  // }
}
