import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty, IsPhoneNumber, IsDate, IsObject } from 'class-validator';

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

    @IsString()
    address: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    profilePicture: string;
}