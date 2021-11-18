import { Test, TestingModule } from '@nestjs/testing';
import { ServerSettingsService } from './server-settings.service';

describe('ServerSettingsService', () => {
  let service: ServerSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerSettingsService],
    }).compile();

    service = module.get<ServerSettingsService>(ServerSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
