import { Tweet, } from '../../../domain/dto'
import { TwitterError, } from '../../../error'
import { GetUserTwitterTimelineService, } from '../service'
import { GetUserByIdController, } from './GetByIdController'

export class GetUserTwitterTimelineController {
  /**
   * Gets a twitter user timeline limiting the number of tweets
   * @author fnavia
   * @since 1.0.0
   * @param userId An user ID to filter
   * @param maxRecords Max number of tweets
   * @returns A set of tweets
   */
  public static async get(userId: string, maxRecords: number): Promise<Tweet[]> {
    const user = await GetUserByIdController.get(userId)

    try {
      const tweets = await GetUserTwitterTimelineService.get(user.twitterUserName, maxRecords)

      return tweets
    } catch (error) {
      throw new TwitterError()
    }
  }
}