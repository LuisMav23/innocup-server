import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHealthInfoDto } from './dto/create-health_info.dto';
import { UpdateHealthInfoDto } from './dto/update-health_info.dto';

import { dynamoDB } from 'aws-config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HealthInfoService {
  private readonly tableName = 'HealthInfo';

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
}

/*
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { dynamoDB } from 'src/aws-config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HealthInfoService {
  private readonly tableName = 'HealthInfo';

  async createHealthInfo(info: string): Promise<any> {
    const healthInfoId = uuidv4();
    const params = {
      TableName: this.tableName,
      Item: {
        id: healthInfoId,
        info,
      },
    };

    try {
      await dynamoDB.put(params).promise();
      return { id: healthInfoId, info };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create health info');
    }
  }

  async getHealthInfoById(id: string): Promise<any> {
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

  async updateHealthInfo(id: string, info: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: 'set info = :info',
      ExpressionAttributeValues: {
        ':info': info,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update health info');
    }
  }

  async deleteHealthInfo(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      await dynamoDB.delete(params).promise();
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete health info');
    }
  }
}
*/