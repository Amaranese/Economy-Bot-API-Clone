import { Test, TestingModule } from '@nestjs/testing';
import { ServerSettingsController } from './server-settings.controller';
import { ServerSettingsService } from './server-settings.service';

describe('ServerSettingsController', () => {
  let controller: ServerSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerSettingsController],
      providers: [ServerSettingsService],
    }).compile();

    controller = module.get<ServerSettingsController>(ServerSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
