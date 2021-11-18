import { Test, TestingModule } from '@nestjs/testing';
import { UserServerItemController } from './user-server-item.controller';
import { UserServerItemService } from './user-server-item.service';

describe('UserServerItemController', () => {
  let controller: UserServerItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserServerItemController],
      providers: [UserServerItemService],
    }).compile();

    controller = module.get<UserServerItemController>(UserServerItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
