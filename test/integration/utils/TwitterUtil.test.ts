import config from '../../../app/config'
import { TwitterUtil, } from '../../../app/utils'

describe('[Util] Twitter utils', () => {
  it('Get a success Twitter connection', async () => {
    const twitter = TwitterUtil.getClient()

    const data = await twitter.get('statuses/user_timeline', { screen_name: '@nodejs', count: 1, })

    expect(data).toBeTruthy()
    expect((data as []).length).toStrictEqual(1)
  })

  it('Get an error using invalid auth data(token, customer)', async () => {
    jest.mock('../../../app/config')

    config.twitter = {
      auth: {
        consumer: {
          key: 'INVALID-KEY',
          secret: 'INVALID-SECRET',
        },
        bearerToken: 'INVALID-TOKEN',
      },
      timeline: {
        defaultTweetsQty: 0,
      },
    }

    const twitter = TwitterUtil.getClient()

    const dataPromise = twitter.get('statuses/user_timeline', { screen_name: '@nodejs', })

    await expect(dataPromise).rejects.not.toBeNull()
  })
})