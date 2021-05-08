import { TwitterGetUserTimelineController, } from '../../../../../app/modules/twitter/controller'
import { GetUserTwitterTimelineService, } from '../../../../../app/modules/user/service'

describe('[Service] Get user twitter timeline', () => {
  const mockedTwitterData = [
    {
      text: 'Fake twitter text',
      user: {
        name: 'Fake twitter name',
      },
    },
  ]
  const twitterNick = '@nodejs'
  const maxTweets = 5

  beforeEach(() => {
    //jest.clearAllMocks()
  })

  it('Get some tweets successfully', async () => {
    const mockGetTweets = jest.spyOn(TwitterGetUserTimelineController, 'get').mockReturnValue(Promise.resolve(mockedTwitterData))

    const result = await GetUserTwitterTimelineService.get(twitterNick, maxTweets)

    expect(result).toBeTruthy()
    expect(mockGetTweets).toHaveBeenCalledWith(twitterNick, maxTweets)
    expect(typeof result).toBe('object')
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it('Get no tweets', async () => {
    const mockGetTweets = jest.spyOn(TwitterGetUserTimelineController, 'get').mockReturnValue(Promise.resolve({}))

    const result = await GetUserTwitterTimelineService.get(twitterNick, maxTweets)

    expect(result).toBeTruthy()
    expect(mockGetTweets).toHaveBeenCalledWith(twitterNick, maxTweets)
    expect(typeof result).toBe('object')
    expect(result.length).toBe(0)
  })
})