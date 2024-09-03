import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from './entities/emergency_contact.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmergencyContactService {

  constructor(
    @InjectRepository(EmergencyContact)
    private emergencyContactRepository: Repository<EmergencyContact>
  ) {}

  create(createEmergencyContactDto: CreateEmergencyContactDto, userId: string) {
    try{
      const createdAt = new Date().getTime();
      const newEmergencyContactData = {
        userId,
        ...createEmergencyContactDto,
        createdAt
      }
      const newEmergencyContact = this.emergencyContactRepository.create(newEmergencyContactData);
      return this.emergencyContactRepository.save(newEmergencyContact);
    }catch(e){
      console.log('Error creating emergency contact:', e);
      throw new InternalServerErrorException(e);
    }
  }

  async findAllContactsByUserId(userId: string ): Promise<any> {
    try{
      const res = await this.emergencyContactRepository.find({ where: { user: { id: userId } } });
      if (res.length === 0) {
        throw new Error('No emergency contacts found for user');
      }
      return res;
    }catch(e){
      console.log('Error finding emergency contacts:', e);
      throw new InternalServerErrorException(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} emergencyContact`;
  }

  update(id: number, updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return `This action updates a #${id} emergencyContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} emergencyContact`;
  }
}
