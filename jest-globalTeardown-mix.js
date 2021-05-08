/* eslint-disable @typescript-eslint/no-var-requires */
const jestDynamoDb = require('@shelf/jest-dynamodb/jest-preset'),
    dynamoGlobalTeardown = require(jestDynamoDb.globalTeardown),
    jestS3 = require('jest-s3/jest-preset'),
    s3GlobalTeardown = require(jestS3.globalTeardown)

module.exports = async () => Promise.all([ dynamoGlobalTeardown(), s3GlobalTeardown(), ])