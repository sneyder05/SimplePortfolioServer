import { APIGatewayEvent, } from 'aws-lambda'
import config from '../../config'
import { JoiValidate, } from '../../libs/lambda-joisify'
import { GetUserTwitterTimelineController, } from '../../modules/user/controller'
import { IAppError, IEventResponse, } from '../../types'
import { MessageUtil, } from '../../utils'
import { GetTwitterTimeline, } from './validation'

export class GetUserTwitterTimelineEntrypoint {
  /**
   * Gets the twitter user timeline filtering by ID
   * @author fnavia
   * @since 1.0.0
   * @param event Lambda request event
   * @returns A formatted request response
   */
  @JoiValidate(GetTwitterTimeline)
  public static async get(event: APIGatewayEvent): Promise<IEventResponse> {
    try {
      const userId: string = event.pathParameters.id
      let count = parseInt(event.pathParameters.count)
      count = !isNaN(count) ? count : config.twitter.timeline.defaultTweetsQty

      const tweets = await GetUserTwitterTimelineController.get(userId, count)

      return MessageUtil.success(tweets)
    } catch (err) {
      return MessageUtil.from(err as IAppError)
    }
  }
}