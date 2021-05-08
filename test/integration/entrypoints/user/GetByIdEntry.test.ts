import { APIGatewayEvent, } from 'aws-lambda'
import HttpCode from 'http-status-codes'
import config from '../../../../app/config'
import { User, } from '../../../../app/domain/dto/User'
import { GetUserByIdEntrypoint, } from '../../../../app/entrypoints/user'
import { Any, } from '../../../../app/types'
import { ASWUtil, } from '../../../../app/utils'

describe('[Entrypoint] Get user by ID', () => {
  const userData: User = {
    userId: 'ABC123',
    twitterUserName: '@nodejs',
    description: 'Lorem ipsum dolor',
    fullname: 'Jon Doe',
    image: 'http://path/to/the/image.png',
  }

  beforeAll(async () => {
    const dynamo = ASWUtil.getDynamoDb()
    await dynamo.put({
      TableName: config.dynamo.tables.User,
      Item: userData,
    }).promise()
  })

  it('Get a user successfully', async () => {
    const lambdaEvent = {
      pathParameters: {
        id: userData.userId,
      },
    }

    const result = await GetUserByIdEntrypoint.get((lambdaEvent as Any) as APIGatewayEvent)

    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(HttpCode.OK)
    expect(result.body).toBeTruthy()
    expect(JSON.parse(result.body)).toHaveProperty('data')
    expect(JSON.parse(result.body).data).toStrictEqual(userData)
  })

  it('Getting an error due nonexisting user', async () => {
    const lambdaEvent = {
      pathParameters: {
        id: 'NULL',
      },
    }

    const result = await GetUserByIdEntrypoint.get((lambdaEvent as Any) as APIGatewayEvent)

    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(HttpCode.NOT_FOUND)
  })
})