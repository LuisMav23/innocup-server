import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyContactService } from './emergency_contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';

@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(private readonly emergencyContactService: EmergencyContactService) {}

  @Post('add/:userId')
  create(@Body() createEmergencyContactDto: CreateEmergencyContactDto, @Param('userId') userId: string) {
    return this.emergencyContactService.create(createEmergencyContactDto, userId);
  }

  @Get()
  findAll() {
    return this.emergencyContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return this.emergencyContactService.update(+id, updateEmergencyContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactService.remove(+id);
  }
}
