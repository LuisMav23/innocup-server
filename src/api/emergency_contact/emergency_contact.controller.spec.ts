import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyContactController } from './emergency_contact.controller';
import { EmergencyContactService } from './emergency_contact.service';

describe('EmergencyContactController', () => {
  let controller: EmergencyContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyContactController],
      providers: [EmergencyContactService],
    }).compile();

    controller = module.get<EmergencyContactController>(EmergencyContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
