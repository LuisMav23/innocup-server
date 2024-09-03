import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmergencyContactDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    relationship: string;
}
