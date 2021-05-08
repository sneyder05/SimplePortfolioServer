import config from '../../../../../app/config'
import { User, } from '../../../../../app/domain/dto'
import { GetUserByIdService, } from '../../../../../app/modules/user/service'
import { ASWUtil, } from '../../../../../app/utils'

describe('[Service] Get user by ID', () => {
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
    const result = await GetUserByIdService.get(userData.userId)

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('Item')
    expect(result.Item).not.toBeNull()
    expect(result.Item).toHaveProperty('userId')
    expect(result.Item.userId).toBe(userData.userId)
  })

  it('Get an empty result with an invalid ID', async () => {
    const result = await GetUserByIdService.get('NULL')

    expect(result).toBeTruthy()
    expect(Object.keys(result).length).toBe(0)
  })
})