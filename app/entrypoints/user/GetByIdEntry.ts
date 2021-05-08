import { APIGatewayEvent, } from 'aws-lambda'
import { JoiValidate, } from '../../libs/lambda-joisify'
import { GetUserByIdController, } from '../../modules/user/controller'
import { IAppError, IEventResponse, } from '../../types'
import { MessageUtil, } from '../../utils'
import { GetById, } from './validation'

export class GetUserByIdEntrypoint {
  /**
   * Gets an user filtering by ID
   * @author fnavia
   * @since 1.0.0
   * @param event Lambda request event
   * @returns A formatted request response
   */
  @JoiValidate(GetById)
  public static async get(event: APIGatewayEvent): Promise<IEventResponse> {
    try {
      const userId: string = event.pathParameters.id

      const result = await GetUserByIdController.get(userId)

      return MessageUtil.success(result)
    } catch (err) {
      return MessageUtil.from(err as IAppError)
    }
  }
}