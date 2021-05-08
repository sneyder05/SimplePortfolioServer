import { APIGatewayEvent, } from 'aws-lambda'
import HttpCode from 'http-status-codes'
import config from '../../../../app/config'
import { User, } from '../../../../app/domain/dto/User'
import { UpdateUserEntrypoint, } from '../../../../app/entrypoints/user'
import { Any, } from '../../../../app/types'
import { ASWUtil, } from '../../../../app/utils'
import base64Images from '../../../res/base64Images.json'

describe('[Entrypoint] Update user', () => {
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

  const lambdaEvent = {
    pathParameters: {
      id: userData.userId,
    },
    body: JSON.stringify({
      description: 'New value for description',
      twitterUserName: '@typescript',
      fullname: 'New value for fullname',
      image: base64Images.example,
    }),
  }

  it('Update an user successfully', async () => {
    const result = await UpdateUserEntrypoint.update((lambdaEvent as Any) as APIGatewayEvent)

    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(HttpCode.OK)
  })

  it('Not found a user to update', async () => {
    const lambdaEventForError = {
      pathParameters: {
        id: 'NULL',
      },
      body: JSON.stringify({
        description: 'New value for description',
        twitterUserName: '@typescript',
        fullname: 'New value for fullname',
        image: base64Images.example,
      }),
    }

    const result = await UpdateUserEntrypoint.update((lambdaEventForError as Any) as APIGatewayEvent)

    expect(result).toBeTruthy()
    expect(result.statusCode).toBe(HttpCode.NOT_FOUND)
  })
})