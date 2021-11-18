import { PartialType } from '@nestjs/mapped-types';
import { CreateUserServerItemDto } from './create-user-server-item.dto';

export class UpdateUserServerItemDto extends PartialType(
  CreateUserServerItemDto,
) {}
