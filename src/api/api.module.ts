import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config';

@Module({
  providers: [],
  imports: [
    UserModule,
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
  ]
})
export class ApiModule {}
