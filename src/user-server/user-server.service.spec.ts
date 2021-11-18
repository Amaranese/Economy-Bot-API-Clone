import { Test, TestingModule } from '@nestjs/testing';
import { UserServerService } from './user-server.service';

describe('UserServerService', () => {
  let service: UserServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServerService],
    }).compile();

    service = module.get<UserServerService>(UserServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
