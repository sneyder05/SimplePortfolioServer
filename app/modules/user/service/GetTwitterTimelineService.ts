import { Tweet, } from '../../../domain/dto'
import { GenericObject, } from '../../../types'
import { Utilities, } from '../../../utils'
import { TwitterGetUserTimelineController, } from '../../twitter/controller'

export class GetUserTwitterTimelineService {
  /**
   * Gets a twitter user timeline limiting the number of tweets
   * @author fnavia
   * @since 1.0.0
   * @param userId An user ID to filter
   * @param maxRecords Max number of tweets
   * @returns A set of tweets
   */
  public static async get(nick: string, maxRecords: number): Promise<Tweet[]> {
    const data = await TwitterGetUserTimelineController.get(nick, maxRecords)

    if (data && Object.keys(data).length) {
      const pickKeys = [ 'text', 'user.name', 'entities.user_mentions[0].screen_name', 'entities.user_mentions[0].name', ]
      const tweets = (data as GenericObject[]).map(item => Utilities.pick(item, pickKeys) as Tweet)

      return tweets
    }

    return []
  }
}