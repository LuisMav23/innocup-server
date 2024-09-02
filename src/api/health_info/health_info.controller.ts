import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HealthInfoService } from './health_info.service';
import { CreateHealthInfoDto } from './dto/create-health_info.dto';
import { UpdateHealthInfoDto } from './dto/update-health_info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

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

  @Post('medical-document/:healthInfoId')
  @UseInterceptors(FileInterceptor('medicalDocument'))
  uploadMedicalDocument(@Param('healthInfoId') healthInfoId, @Body() metaData: {documentName: string, documentDescription: string}, @UploadedFile() file: Multer.File) {
    return this.healthInfoService.uploadMedicalDocument(healthInfoId, metaData, file)

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

  @Delete('medical-document/:healthInfoId/:documentId')
  removeMedicalDocument(@Param('healthInfoId') healthInfoId: string, @Param('documentId') documentId: string) {
    return this.healthInfoService.removeMedicalDocument(healthInfoId, documentId);
  }
}
