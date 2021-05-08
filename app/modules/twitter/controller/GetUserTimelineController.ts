import Twitter from 'twitter'
import { TwitterGetUserTimelineService, } from '../service'

export class TwitterGetUserTimelineController {
  /**
   * Gets the twitter user timeline filtering by nickname and limiting the number of tweets
   * @author fnavia
   * @since 1.0.0
   * @param nick Twitter nickname
   * @param maxRecords Max number of tweets
   * @returns Default twitter formatted response
   */
  public static async get(nick: string, maxRecords: number): Promise<Twitter.ResponseData> {
    return TwitterGetUserTimelineService.get(nick, maxRecords)
  }
}