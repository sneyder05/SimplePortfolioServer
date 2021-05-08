/* eslint-disable @typescript-eslint/no-var-requires */
const jestDynamoDb = require('@shelf/jest-dynamodb/jest-preset'),
    dynamoGlobalSetup = require(jestDynamoDb.globalSetup),
    jestS3 = require('jest-s3/jest-preset'),
    s3GlobalSetup = require(jestS3.globalSetup)

module.exports = async () => Promise.all([ dynamoGlobalSetup(), s3GlobalSetup(), ])