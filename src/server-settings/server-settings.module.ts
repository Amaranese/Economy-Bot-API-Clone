import { Module } from '@nestjs/common';
import { ServerSettingsService } from './server-settings.service';
import { ServerSettingsController } from './server-settings.controller';
import { ServerModule } from 'src/server/server.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerSettings } from './entities/server-settings.entity';

@Module({
  imports: [ServerModule, TypeOrmModule.forFeature([ServerSettings])],
  controllers: [ServerSettingsController],
  providers: [ServerSettingsService],
})
export class ServerSettingsModule {}
