import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  providers: [],
  imports: [UserModule]
})
export class ApiModule {}
