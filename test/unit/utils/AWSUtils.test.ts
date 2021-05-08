import { APIGatewayEvent, } from 'aws-lambda'
import { Any, } from '../../../app/types'
import { ASWUtil, } from '../../../app/utils/AWSUtil'

const mockAWSUtil = jest.mock('../../../app/utils/AWSUtil')

describe('[Util] AWS utils test cases', () => {
  afterEach(() => {
    mockAWSUtil.resetAllMocks()
  })

  it('Get a DynamoDB instance', () => {
    const dynamo = ASWUtil.getDynamoDb()

    expect(dynamo).toBeDefined()
    expect(dynamo.get).toBeDefined()
  })

  it('Parse successfully body from event', () => {
    const lambdaEventBody = {
      fullname: 'Jon Doe',
      description: 'Lorem ipsum dolor',
      image: 'http://new/path/to/the/image.jpg',
    }
    const lambdaEvent = {
      body: JSON.stringify(lambdaEventBody),
    }

    const result = ASWUtil.parseBodyFromEvent((lambdaEvent as Any) as APIGatewayEvent)

    expect(result).toBeDefined()
    expect(result).toStrictEqual(lambdaEventBody)
  })

  it('Parse successfully body from event with default value', () => {
    const lambdaEvent = {
      body: 'Unexpecte JSON formatted string',
    }
    const defaultParsedValue = { defaultKey: 'defaultValue', }

    const result = ASWUtil.parseBodyFromEvent((lambdaEvent as Any) as APIGatewayEvent, defaultParsedValue)

    expect(result).toBeDefined()
    expect(result).toStrictEqual(defaultParsedValue)
  })
})