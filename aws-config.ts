import { BedrockClient } from '@aws-sdk/client-bedrock';
import * as AWS from 'aws-sdk';

// AWS.config.update();

export const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'ap-southeast-1',
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET,
});

export const s3Client = new AWS.S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
})