import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthInfoModule } from './health_info/health_info.module';
import { EmergencyContactModule } from './emergency_contact/emergency_contact.module';
import configuration from './config';

@Module({
  providers: [],
  imports: [
    UserModule,
    HealthInfoModule,

    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // makes ConfigService globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // or 'mysql', 'sqlite', etc.
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // adjust the path to your entities
        synchronize: true, // use this in development to auto-sync schema
      }),
      inject: [ConfigService],
    }),
    EmergencyContactModule,
  ]
})
export class ApiModule {}
