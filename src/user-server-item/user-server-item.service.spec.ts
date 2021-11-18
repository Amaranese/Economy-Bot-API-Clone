import { Test, TestingModule } from '@nestjs/testing';
import { UserServerItemService } from './user-server-item.service';

describe('UserServerItemService', () => {
  let service: UserServerItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServerItemService],
    }).compile();

    service = module.get<UserServerItemService>(UserServerItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
