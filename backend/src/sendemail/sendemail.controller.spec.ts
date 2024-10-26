import { Test, TestingModule } from '@nestjs/testing';
import { SendemailController } from './sendemail.controller';
import { SendemailService } from './sendemail.service';

describe('SendemailController', () => {
  let controller: SendemailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendemailController],
      providers: [SendemailService],
    }).compile();

    controller = module.get<SendemailController>(SendemailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
