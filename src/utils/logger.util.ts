import { APIGatewayProxyEvent, Context } from "aws-lambda";

export const logApiExecution = (
    event: APIGatewayProxyEvent,
    context: Context
) => {
    console.log("API Gateway Event: ", event);
    console.log("Execution context: ", context);
}