import Twitter from 'twitter'
import { TwitterUtil, } from '../../../utils'

export class TwitterGetUserTimelineService {
  public static readonly ENDPOINT = 'statuses/user_timeline'

  /**
   * Gets the twitter user timeline filtering by nickname and limiting the number of tweets
   * @author fnavia
   * @since 1.0.0
   * @param nick Twitter nickname
   * @param maxRecords Max number of tweets
   * @returns Default twitter formatted response
   */
  public static async get(nick: string, maxRecords: number): Promise<Twitter.ResponseData> {
    const twitter = TwitterUtil.getClient()

    const res = await twitter.get(TwitterGetUserTimelineService.ENDPOINT, { count: maxRecords, screen_name: nick, })

    return res
  }
}