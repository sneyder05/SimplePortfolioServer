import { DocumentClient, } from 'aws-sdk/clients/dynamodb'
import config from '../../../config'
import { ASWUtil, } from '../../../utils'

const dynamoDb = ASWUtil.getDynamoDb()

export class GetUserByIdService {
  /**
   * Gets an user filtering by ID
   * @author fnavia
   * @since 1.0.0
   * @param userId User ID to filter
   * @returns A DynamoDB user object
   */
  public static async get(userId: string): Promise<DocumentClient.GetItemOutput> {
    const query = {
      TableName: config.dynamo.tables.User,
      Key: { userId, },
    }

    const user = await dynamoDb.get(query).promise()

    return user
  }
}