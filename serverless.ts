import type { AWS } from '@serverless/typescript';
import { AppModule } from './src/app.module'

/**
 * Serverless main configuration
 */
const serverlessConfiguration: AWS = {
  service: 'vehicles-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    api_base: "arn:aws:execute-api:#{AWS::Region}:#{AWS::AccountId}:#{ApiGatewayRestApi}/${self:provider.stage}"
  },
  plugins: [
    'serverless-webpack'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE: '${self:service}-${opt:stage, self:provider.stage}'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
      }
    ]
  },
  functions: AppModule,
  resources: {
    Resources: {
      BasicRolePolicy: {
        Type: "AWS::IAM::ManagedPolicy",
        Properties: {
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: [
                  "execute-api:Invoke"
                ],
                Resource: [
                  "*"
                ]
              }
            ]
          }
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
