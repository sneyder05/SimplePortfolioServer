type TweetUserMention = {
  screen_name: string,
  name: string
}

export type Tweet = {
  text: string,
  user: {
    name: string
  },
  entities?: {
    user_mentions: TweetUserMention[]
  }
}