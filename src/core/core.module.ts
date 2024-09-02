import { Module } from '@nestjs/common';
import { S3ServiceService } from './s3_service/s3_service.service';

@Module({
  providers: [S3ServiceService]
})
export class CoreModule {}
