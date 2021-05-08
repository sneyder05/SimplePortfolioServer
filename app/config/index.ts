export default {
  app: {
    isOffile: process.env.IS_OFFLINE === 'true',
  },
  dynamo: {
    tables: {
      User: process.env.DYNAMO_USER_TABLE || 'users',
    },
  },
  s3: {
    bucketName: process.env.S3_BUCKET_NAME || 's3-bucket',
  },
  axios: {
    retry: {
      qty: parseInt(process.env.AXIOS_RETRY_QTY ? process.env.AXIOS_RETRY_QTY : '1' ) || 1,
    },
  },
  twitter: {
    timeline: {
      defaultTweetsQty: parseInt(process.env.TWITTER_USER_TIMELINE_DEF_QTY ? process.env.TWITTER_USER_TIMELINE_DEF_QTY : '5' ),
    },
    auth: {
      consumer: {
        key: process.env.TWITTER_API_CONSUMER_KEY,
        secret: process.env.TWITTER_API_CONSUMER_SECRET,
      },
      bearerToken: process.env.TWITTER_API_BEARER_TOKEN,
    },
  },
}