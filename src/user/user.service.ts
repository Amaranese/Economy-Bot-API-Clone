import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorDto } from 'src/dto/error.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<void> {
    try {
      const user = await this.userRepository.create(newUser);
      await this.userRepository.save(user).catch(() => {
        throw new ErrorDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "couldn't save user, maybe not providing all data needed",
        );
      });
    } catch (err) {
      throw err;
    }
  }

  async getUserByDiscordId(userId: string): Promise<User> {
    try {
      const user = this.userRepository
        .findOneOrFail({ where: { discordId: userId } })
        .catch(() => {
          throw new ErrorDto(HttpStatus.NOT_FOUND, 'user not found');
        });

      return user;
    } catch (err) {
      throw err;
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
