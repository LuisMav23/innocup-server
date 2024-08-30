import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET,
});

export const dynamoDB = new AWS.DynamoDB.DocumentClient();