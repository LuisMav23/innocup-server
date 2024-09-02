import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import {
    IsString,
    IsInt,
    IsNotEmpty,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
}
