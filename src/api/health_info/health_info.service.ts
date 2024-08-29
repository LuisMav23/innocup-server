import { Injectable } from '@nestjs/common';
import { CreateHealthInfoDto } from './dto/create-health_info.dto';
import { UpdateHealthInfoDto } from './dto/update-health_info.dto';

@Injectable()
export class HealthInfoService {
  create(createHealthInfoDto: CreateHealthInfoDto) {
    return 'This action adds a new healthInfo';
  }

  findAll() {
    return `This action returns all healthInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthInfo`;
  }

  update(id: number, updateHealthInfoDto: UpdateHealthInfoDto) {
    return `This action updates a #${id} healthInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthInfo`;
  }
}
