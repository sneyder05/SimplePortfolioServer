import Twitter from 'twitter'
import config from '../config'

export class TwitterUtil {
  /**
   * Creates a Twitter client instance to call Twitter API
   * @author fnavia
   * @since 1.0.0
   * @returns A Twitter client instance
   */
  public static getClient(): Twitter {
    return new Twitter({
      consumer_key: config.twitter.auth.consumer.key,
      consumer_secret: config.twitter.auth.consumer.secret,
      bearer_token: config.twitter.auth.bearerToken,
    })
  }
}