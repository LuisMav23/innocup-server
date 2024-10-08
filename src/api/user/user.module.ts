import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { S3ServiceService } from 'src/core/s3_service/s3_service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, S3ServiceService],
})
export class UserModule {}
