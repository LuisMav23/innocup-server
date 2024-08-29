import { Test, TestingModule } from '@nestjs/testing';
import { HealthInfoController } from './health_info.controller';
import { HealthInfoService } from './health_info.service';

describe('HealthInfoController', () => {
  let controller: HealthInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthInfoController],
      providers: [HealthInfoService],
    }).compile();

    controller = module.get<HealthInfoController>(HealthInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
