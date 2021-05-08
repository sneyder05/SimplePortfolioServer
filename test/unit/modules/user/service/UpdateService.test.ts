import config from '../../../../../app/config'
import { User, } from '../../../../../app/domain/dto'
import { UpdateUserService, } from '../../../../../app/modules/user/service'
import { ASWUtil, } from '../../../../../app/utils'
import base64Images from '../../../../res/base64Images.json'

describe('[Service] Update user', () => {
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

  it('Update an user successfully', async () => {
    const newUserData: User = {
      ...userData,
      fullname: 'Jane Doe',
      twitterUserName: '@typescript',
      image: base64Images.example,
    }

    const updatePromise = UpdateUserService.update(newUserData)

    await expect(updatePromise).resolves.not.toThrow()
  })

  it('Error updating user due to not found user', async () => {
    // Replace user id with an unexpected string
    const userDataForError: User = {
      ...userData,
      userId: 'NULL',
    }

    const updatePromise = UpdateUserService.update(userDataForError)

    await expect(updatePromise).rejects.toThrow(/Unable to find an user/ig)
  })

  it('Error updateing user due to unable to save the record', async () => {
    // Provide only a valid user ID wihtout other valid data
    const userDataForError = {
      userId: userData.userId,
    } as User

    const updatePromise = UpdateUserService.update(userDataForError)

    await expect(updatePromise).rejects.toThrow(/Unable to save/ig)
  })
})