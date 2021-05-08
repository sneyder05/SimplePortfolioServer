import HttpCode from 'http-status-codes'
import { NotFoundError, } from '../../../app/error'
import { MessageUtil, } from '../../../app/utils'

describe('[Util] Message util test cases', () => {
  describe('Success event response - Suite', () => {
    it('Get a success event', () => {
      const result = MessageUtil.success()

      expect(result).toBeDefined()
      expect(result.statusCode).toBe(HttpCode.OK)
    })

    it('Get a success event with data', () => {
      const data = { defaultKey: 'defaultValue', }
      const result = MessageUtil.success(data)

      expect(result).toBeDefined()
      expect(result.statusCode).toBe(HttpCode.OK)
      expect(result.body).toBeDefined()
      expect(JSON.parse(result.body)).toHaveProperty('data')
      expect(JSON.parse(result.body).data).toStrictEqual(data)
    })
  })

  describe('Error event response - Suite', () => {
    it('Get a error event response', () => {
      const result = MessageUtil.error('Unable to lookup the requested file')

      expect(result).toBeDefined()
      expect(result.statusCode).toBe(HttpCode.INTERNAL_SERVER_ERROR)
    })

    it('Get a error event response with a specific code', () => {
      const expectedCode = HttpCode.BAD_GATEWAY.toString()
      const result = MessageUtil.error('Unable to lookup the requested file', {}, expectedCode)

      expect(result).toBeDefined()
      expect(result.body).toBeDefined()
      expect(JSON.parse(result.body)).toHaveProperty('code')
      expect(JSON.parse(result.body).code).toBe(expectedCode)
    })

    it('Get a error event response with data', () => {
      const data = { defaultKey: 'defaultValue', }
      const result = MessageUtil.error('Unable to lookup the requested file', data)

      expect(result).toBeDefined()
      expect(result.body).toBeDefined()
      expect(JSON.parse(result.body)).toHaveProperty('data')
      expect(JSON.parse(result.body).data).toStrictEqual(data)
    })
  })

  describe('Getting a result using "from"', () => {
    it('Get a not found error event response', () => {
      const result = MessageUtil.from(new NotFoundError())

      expect(result).toBeDefined()
      expect(result.statusCode).toBe(HttpCode.NOT_FOUND)
    })
  })
})