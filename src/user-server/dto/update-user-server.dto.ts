import { PartialType } from '@nestjs/mapped-types';
import { CreateUserServerDto } from './create-user-server.dto';

export class UpdateUserServerDto extends PartialType(CreateUserServerDto) {}
