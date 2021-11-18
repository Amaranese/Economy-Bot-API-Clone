import { Test, TestingModule } from '@nestjs/testing';
import { UserServerController } from './user-server.controller';
import { UserServerService } from './user-server.service';

describe('UserServerController', () => {
  let controller: UserServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserServerController],
      providers: [UserServerService],
    }).compile();

    controller = module.get<UserServerController>(UserServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
