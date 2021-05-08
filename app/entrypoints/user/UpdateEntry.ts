import { APIGatewayEvent, } from 'aws-lambda'
import { User, } from '../../domain/dto'
import { JoiValidate, } from '../../libs/lambda-joisify'
import { UpdateUserController, } from '../../modules/user/controller'
import { GenericObject, IAppError, IEventResponse, } from '../../types'
import { ASWUtil, MessageUtil, } from '../../utils'
import { Update, } from './validation'

export class UpdateUserEntrypoint {
  /**
   * Updates an user
   * @author fnavia
   * @since 1.0.0
   * @param event Lambda request event
   * @returns A formatted request response
   */
  @JoiValidate(Update)
  public static async update(event: APIGatewayEvent): Promise<IEventResponse> {
    try {
      const userId: string = event.pathParameters.id

      const userData = this.parseUserData(ASWUtil.parseBodyFromEvent(event), userId)

      await UpdateUserController.update(userData)

      return MessageUtil.success()
    } catch (err) {
      return MessageUtil.from(err as IAppError)
    }
  }

  /**
   * Parses the lambda request payload into User
   * @author fnavia
   * @since 1.0.0
   * @param data User payload
   * @param userId User ID which will be updated
   * @returns A formmatted user type
   */
  private static parseUserData(data: GenericObject, userId: string | null): User {
    const userData: User = {
      fullname: data.fullname,
      description: data.description,
      image: data.image,
      twitterUserName: data.twitterUserName,
    }

    if (userId) {
      userData.userId = userId
    }

    return userData
  }
}