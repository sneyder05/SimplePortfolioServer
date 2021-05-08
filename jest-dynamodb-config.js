module.exports = {
  tables: [
    {
      TableName: 'user-portfolio-test',
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH', },
      ],
      AttributeDefinitions: [
        { AttributeName: 'userId', AttributeType: 'S', },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1, WriteCapacityUnits: 1,
      },
    },
  ],
}