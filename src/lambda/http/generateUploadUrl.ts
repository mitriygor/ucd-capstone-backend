import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as uuid from 'uuid';
import 'source-map-support/register';

const AWSXRay = require('aws-xray-sdk');
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  console.log('todoId', todoId);


  const bucket = process.env.S3_BUCKET;
  const url_exp = 300;
  const todosTable = process.env.TODOS_TABLE;

  const imageId = uuid.v4();
  console.log('imageId', imageId);
  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });


  const url = s3.getSignedUrl('putObject',{
    Bucket: bucket,
    Key: imageId,
    Expires: url_exp
  });

  const imageUrl = `https://${bucket}.s3.amazonaws.com/${imageId}`;

  console.log('imageUrl', imageUrl);

  const updateUrlOnTodo = {
    TableName: todosTable,
    Key: { "todoId": todoId },
    UpdateExpression: "set attachmentUrl = :a",
    ExpressionAttributeValues:{
      ":a": imageUrl
  },
  ReturnValues:"UPDATED_NEW"
  };
  console.log('updateUrlOnTodo', updateUrlOnTodo);

  const runthis = await docClient.update(updateUrlOnTodo).promise().catch(err => {
    console.log('error', err);
  });

  console.log('runthis', runthis);

  return {
      statusCode: 201,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          iamgeUrl: imageUrl,
          uploadUrl: url
      })
  }
};
