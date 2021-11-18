import { PartialType } from '@nestjs/mapped-types';
import { CreateServerSettingDto } from './create-server-setting.dto';

export class UpdateServerSettingDto extends PartialType(
  CreateServerSettingDto,
) {}
