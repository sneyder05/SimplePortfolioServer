import { APIGatewayEvent, } from 'aws-lambda'
import { GenericObject, } from '../../types'
import { DocumentClient, } from 'aws-sdk/clients/dynamodb'
import AWS, { S3, } from 'aws-sdk'

const isTest = process.env.JEST_WORKER_ID

export class ASWUtil {
  /**
   * Creates a DynamoDB client validating if the app is running as test mode
   * @author fnavia
   * @since 1.0.0
   * @returns A DynamoDB instance
   */
  public static getDynamoDb(): DocumentClient {
    return new DocumentClient({
      convertEmptyValues: true,
      ...isTest && {
        endpoint: 'http://localhost:8000',
        region: 'localhost_mock',
      },
    })
  }

  /**
   * Creates a S3 client validating if the app is running as test mode
   * @author fnavia
   * @since 1.0.0
   * @returns A S3 instance
   */
   public static getS3(): S3 {
    return new AWS.S3({
      s3ForcePathStyle: true,
      ...isTest && {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
        endpoint: new AWS.Endpoint('http://localhost:8008'),
      },
    })
  }

  /**
   * Parses the lambda request payload into User
   * @author fnavia
   * @since 1.0.0
   * @param data User payload
   * @param userId User ID which will be updated
   * @returns A formmatted user type
   */
  public static parseBodyFromEvent(event: APIGatewayEvent, defaultValue = {}): GenericObject {
    try {
      const body = JSON.parse(event.body)

      return body
    } catch (err) {
      return defaultValue || {}
    }
  }
}