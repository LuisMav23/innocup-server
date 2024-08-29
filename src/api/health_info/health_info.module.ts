import { Module } from '@nestjs/common';
import { HealthInfoService } from './health_info.service';
import { HealthInfoController } from './health_info.controller';

@Module({
  controllers: [HealthInfoController],
  providers: [HealthInfoService],
})
export class HealthInfoModule {}
