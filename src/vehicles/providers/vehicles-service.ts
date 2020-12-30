import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { HttpResponse } from "../../utils/api-response.util";
import { DynamoDB } from "../../utils/dynamodb.util";
import { HttpStatus } from "../../utils/enums/http-status.enum";
import { logApiExecution } from "../../utils/logger.util";

/**
 * Method responsible for providing a mechanism for retrieving the vehicle list
 * 
 * @param event 
 * @param context 
 */
export const getVehicles = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    logApiExecution(event, context);
    const dynamoDb = new DynamoDB();
    const search = {
        TableName: process.env.DYNAMODB_TABLE,
    };

   return dynamoDb.scan(search)
    .then(result => {
        return HttpResponse(HttpStatus.OK, result.Items);
    })
    .catch(error => {
        return HttpResponse(HttpStatus.NOT_FOUND, error);
    });
}

/**
 * Method responsible for providing a mechanism for update the vehicle status
 * 
 * @param event 
 * @param context 
 */
export const patchVehicleStatus = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    logApiExecution(event, context);
    const dynamoDb = new DynamoDB();
    const body = JSON.parse(event.body);
    const input = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.idVehicle
        },
        UpdateExpression: "set #status = :status, estimatedate = :estimatedate",
        ExpressionAttributeNames: {
            "#status": "status"
        },
        ExpressionAttributeValues: {
            ":status": body.status,
            ":estimatedate": body.estimatedate,
        }
    };

   return dynamoDb.update(input)
    .then(() => {
        return HttpResponse(HttpStatus.OK, 'updated');
    })
    .catch(error => {
        console.log(error);
        return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    });
}