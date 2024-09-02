import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHealthInfoDto } from './dto/create-health_info.dto';
import { UpdateHealthInfoDto } from './dto/update-health_info.dto';
import { S3ServiceService } from 'src/core/s3_service/s3_service.service';

import { dynamoDB } from 'aws-config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HealthInfoService {
  private readonly tableName = 'HealthInfo';

  constructor(private readonly s3Service: S3ServiceService) {}

  async create(createHealthInfoDto: CreateHealthInfoDto): Promise<any> {
    const healthInfoId = uuidv4();
    const info = createHealthInfoDto
    const params = {
      TableName: this.tableName,
      Item: {
        id: healthInfoId,
        ...info,
      },
    };
    try {
      await dynamoDB.put(params).promise();
      return { id: healthInfoId, info };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create health info');
    }
  }

  findAll() {
    return `This action returns all healthInfo`;
  }

  async findById(id: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      const result = await dynamoDB.get(params).promise();
      if (!result.Item) {
        throw new NotFoundException(`Health info with ID ${id} not found`);
      }
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get health info');
    }
  }

  async uploadMedicalDocument(healthInfoId: string, metaData: {documentName: string, documentDescription: string}, file: any): Promise<any> {
    const bucketName = 'innocup-bucket';

    const fileUrl = await this.s3Service.uploadFile(file, bucketName);
    const uploadedAt = new Date().toISOString();
    const healthDocumentData = {
      id: uuidv4(),
      documentName: metaData.documentName,
      documentDescription: metaData.documentDescription,
      uploadedAt,
      fileUrl,
    }
    const healthInfo = await this.findById(healthInfoId);

    const medicalDocuments = [
      ...(healthInfo.medicalDocuments || []),
      healthDocumentData
    ];

    console.log('medicalDocuments', medicalDocuments);

    const params = {
      TableName: this.tableName,
      Key: {
        id: healthInfoId,
      },
      UpdateExpression: 'set medicalDocuments = :medicalDocuments',
      ExpressionAttributeValues: {
        ':medicalDocuments': medicalDocuments,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload medical document');
    }
  }

  
  async findByUserId(userId: string): Promise<any> {
    console.log('userId', userId);
    const params = {
      TableName: this.tableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ":userId": userId
      },
    };

    try {
      const result = await dynamoDB.query(params).promise();
      if (!result.Items || result.Items.length === 0) {
        console.log("No items found for userId:", userId);
        throw new NotFoundException(`Health info with ID ${userId} not found`);
      }
      console.log("Query succeeded, items:", result.Items);
      return result.Items;
    } catch (error) {
      console.log('Error querying DynamoDB:', error);
      throw new InternalServerErrorException('Failed to get health info');
    }
  }

  update(id: number, updateHealthInfoDto: UpdateHealthInfoDto) {
    return `This action updates a #${id} healthInfo`;
  }

  async remove(id: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      const result = await dynamoDB.delete(params).promise();
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete health info');
    }
  }

  async removeMedicalDocument(healthInfoId: string, documentId: string): Promise<any> {
    const bucketName = 'innocup-bucket';
    const healthInfo = await this.findById(healthInfoId);
    const medicalDocuments = healthInfo.medicalDocuments || [];
    const updatedMedicalDocuments = medicalDocuments.filter((doc: any) => doc.id !== documentId);
    const document = medicalDocuments.find((doc: any) => doc.id === documentId);
    const fileKey = document.fileUrl.split('/').pop();
    try{
      const rmDocumentResult = await this.s3Service.deleteFile(fileKey, bucketName);
      console.log('Document Remove:', rmDocumentResult);
    }catch(e){
      console.log('Error deleting file:', e);
      throw e;
    }

    const params = {
      TableName: this.tableName,
      Key: {
        id: healthInfoId,
      },
      UpdateExpression: 'set medicalDocuments = :medicalDocuments',
      ExpressionAttributeValues: {
        ':medicalDocuments': updatedMedicalDocuments,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove medical document');
    }
  }
}