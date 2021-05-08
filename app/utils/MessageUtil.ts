import HttpCode from 'http-status-codes'
import { GenericObject, IAppError, IEventResponse, IEventResponseBody, } from '../types'

class Result {
  private statusCode: number;
  private code: string;
  private message: string;
  private data?: GenericObject;

  constructor(statusCode: number, code: string, message: string, data?: GenericObject) {
    this.statusCode = statusCode
    this.code = code
    this.message = message
    this.data = data
  }

  /**
   * Formats the request response
   * @author fnavia
   * @since 1.0.0.
   * @returns A formatted event response
   */
  format (): IEventResponse {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      } as IEventResponseBody),
    }
  }
}

export class MessageUtil {
  /**
   * Creates a success request response
   * @author fnavia
   * @since 1.0.0
   * @param data Request response data
   * @returns A formatted event response
   */
  static success(data?: GenericObject): IEventResponse {
    const result = new Result(HttpCode.OK, '0', 'success', data || {})

    return result.format()
  }

  /**
   * Creates an error request response
   * @author fnavia
   * @since 1.0.0
   * @param message Request response message
   * @param data Request response data
   * @param code Request response code
   * @returns A formatted event response
   */
  static error(message: string, data?: GenericObject, code?: string): IEventResponse {
    const result = new Result(HttpCode.INTERNAL_SERVER_ERROR, code || HttpCode.INTERNAL_SERVER_ERROR.toString(), message, data)

    return result.format()
  }

  /**
   * Creates an error request response based on an specific error
   * @author fnavia
   * @since 1.0.0
   * @param err Error thrown
   * @returns A formatted event response
   */
  static from(err: IAppError): IEventResponse {
    const result = new Result(err.statusCode, err.code, err.message, {})

    return result.format()
  }
}