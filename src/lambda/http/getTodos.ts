import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { parseUserId } from '../../auth/utils'

const AWSXRay = require('aws-xray-sdk');
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

const todosTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("EVENT:", event);

    const authHeader = event.headers.Authorization;
    const authSplit = authHeader.split(" ");
    const userId = parseUserId(authSplit[1]);
    
    const result = await docClient.query({
        TableName : todosTable,
        IndexName: "UserIdIndex",
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
  
        ScanIndexForward: false
    }).promise();

    const items = result.Items;

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items
        })
    }
};
