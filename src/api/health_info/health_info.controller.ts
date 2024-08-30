import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthInfoService } from './health_info.service';
import { CreateHealthInfoDto } from './dto/create-health_info.dto';
import { UpdateHealthInfoDto } from './dto/update-health_info.dto';

@Controller('health-info')
export class HealthInfoController {
  constructor(private readonly healthInfoService: HealthInfoService) {}

  @Post()
  create(@Body() createHealthInfoDto: CreateHealthInfoDto) {
    if (!createHealthInfoDto.userId) {
      throw new Error('userId is required');
    }
    return this.healthInfoService.create(createHealthInfoDto);
  }

  @Get()
  findAll() {
    return this.healthInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthInfoService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.healthInfoService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthInfoDto: UpdateHealthInfoDto) {
    return this.healthInfoService.update(+id, updateHealthInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthInfoService.remove(id);
  }
}
