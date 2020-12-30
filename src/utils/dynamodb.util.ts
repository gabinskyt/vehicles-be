import { DynamoDB as Connection } from 'aws-sdk';

/**
 * Class responsible for provide a Promise based way to use dynamodb
 */
export class DynamoDB {
    private connection: Connection.DocumentClient;

    constructor() {
        this.connection = new Connection.DocumentClient();
    }

    /**
     * Search for an specific resource
     * 
     * @param search 
     */
    public scan(search: Connection.DocumentClient.ScanInput): Promise<Connection.DocumentClient.ScanOutput> {
        return new Promise((resolve, reject) => {
            this.connection.scan(search, (error, result) => {
                error && reject(error);
                resolve(result);
            });
        });
    }

    /**
     * Updates partially a record
     * 
     * @param input 
     */
    public update(input: Connection.DocumentClient.UpdateItemInput): Promise<Connection.DocumentClient.UpdateItemOutput> {
        return new Promise((resolve, reject) => {
            this.connection.update(input, (error, result) => {
                error && reject(error);
                resolve(result);
            });
        });
    }
}