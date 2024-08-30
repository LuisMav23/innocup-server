import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty, IsPhoneNumber, IsDate, IsObject } from 'class-validator';
import { CreateHealthInfoDto } from '../../health_info/dto/create-health_info.dto';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsInt()
    @IsNotEmpty()
    dateOfBirth: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    healthInfo: CreateHealthInfoDto;
}