import { Module } from '@nestjs/common';
import { HealthInfoService } from './health_info.service';
import { HealthInfoController } from './health_info.controller';
import { S3ServiceService } from 'src/core/s3_service/s3_service.service';

@Module({
  controllers: [HealthInfoController],
  providers: [HealthInfoService, S3ServiceService],
})
export class HealthInfoModule {}
