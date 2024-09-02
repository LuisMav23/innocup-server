import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';


@Module({
  imports: [ApiModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
