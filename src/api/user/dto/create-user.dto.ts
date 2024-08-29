import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty, IsPhoneNumber, IsDate } from 'class-validator';

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

    @IsInt()
    @IsNotEmpty()
    healthInfoId: number;
}