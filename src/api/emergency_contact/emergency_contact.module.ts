import { Module } from '@nestjs/common';
import { EmergencyContactService } from './emergency_contact.service';
import { EmergencyContactController } from './emergency_contact.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/emergency_contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContact])],
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService],
})
export class EmergencyContactModule {}
