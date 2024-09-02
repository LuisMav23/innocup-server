import { Injectable } from '@nestjs/common';
import { s3Client } from 'aws-config';
import { v4 as uuidv4 } from 'uuid';
import { Multer } from 'multer';

@Injectable()
export class S3ServiceService {
    private s3 = s3Client;

    async uploadFile(file: Multer.File, bucketName: string): Promise<string> {
    console.log('Uploading file:', file);
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try{
        const data = await this.s3.upload(params).promise();
        return data.Location;

    }catch(e){
        console.log('Error uploading file:', e);
        throw e;
    }
    }
}
