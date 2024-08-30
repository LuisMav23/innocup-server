import { IsArray, IsDateString, IsEnum, IsString, ValidateNested, } from "class-validator";

enum BloodType {
    A = 'A',
    Ap = 'A+',
    B = 'B',
    Bp = 'B+',
    AB = 'AB',
    ABp = 'AB+',
    O = 'O',
    Op = 'O+',
}

export class CreateHealthInfoDto {
    
    userId: string;

    @IsEnum(BloodType)
    bloodType: BloodType;

    @IsDateString()
    createdAt: string;

    @IsArray()
    chronicConditions: string[];

    @IsArray()
    allergies: string[];

    @IsArray()
    medications: string[];

    @IsArray()
    healthRisks: string[];

    @IsArray()
    pastSurgeries: string[];
    
    @IsArray()
    @ValidateNested({ each: true })
    medicalDocuments: MedicalDocument[];

    @IsArray()
    @ValidateNested({ each: true })
    medicalRecords: MedicalRecord[];
}

class MedicalDocument {
    @IsString()
    documentName: string;
  
    @IsString()
    documentUrl: string;
}

class MedicalRecord {
    @IsString()
    recordName: string;
  
    @IsDateString()
    recordDate: string;
  
    @IsString()
    details: string;
  }

