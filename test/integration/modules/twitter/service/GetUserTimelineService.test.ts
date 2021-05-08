import { TwitterGetUserTimelineService, } from '../../../../../app/modules/twitter/service'

describe('[Service] Get twitter user timeline', () => {
  it('Get a timeline successfully', async () => {
    const data = await TwitterGetUserTimelineService.get('@nodejs', 1)

    expect(data).toBeTruthy()
    expect((data as []).length).toStrictEqual(1)
  })

  it('Error getting a timeline from an nonexistent account', async () => {
    expect.assertions(1)

    try {
      await TwitterGetUserTimelineService.get('@unknown-user-time-line-account', 1)
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })
})