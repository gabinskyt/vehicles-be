import { APIGatewayProxyResult } from "aws-lambda";
import { HttpStatus } from "./enums/http-status.enum";

/**
 * Enable CORS requests
 */
const headers = {
    'Access-Control-Allow-Origin': '*'
};

/**
 * Creates a valid http response
 * 
 * @param statusCode 
 */
export const HttpResponse = (statusCode: HttpStatus, body: any): APIGatewayProxyResult => ({
    headers,
    statusCode,
    body: JSON.stringify(body),
});