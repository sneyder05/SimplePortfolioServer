import HttpCode from 'http-status-codes'
import { IAppError, } from '../types'

class AppError extends Error implements IAppError {
  /**
   * @author fnavia
   * @since 1.0.0
   * @param statusCode HTTP status code
   * @param message Error message
   * @param comments Custom error comments
   * @param code Custom error code
   */
  constructor(public statusCode: number, message: string, public comments?: string, public code?: string) {
    super(message)

    this.code = this.code || this.statusCode.toString()
  }
}

export class NotFoundError extends AppError {
  constructor(msg?: string, comments?: string) {
    super(HttpCode.NOT_FOUND, msg || 'Unable to find the requested resource', comments)
  }
}

export class UnableToSaveRecordError extends AppError {
  constructor(msg?: string, comments?: string) {
    super(HttpCode.UNPROCESSABLE_ENTITY, msg || 'Unable to save the requested record, please check the information sent', comments)
  }
}

export class NetworkError extends AppError {
  constructor(msg?: string) {
    super(HttpCode.BAD_REQUEST, msg || 'Unable to call API endpoint')
  }
}

export class TwitterError extends AppError {
  constructor(msg?: string) {
    super(HttpCode.BAD_REQUEST, msg || 'Unable to communicate with Twitter')
  }
}

export class JoiError extends AppError {
  constructor(msg?: string) {
    super(HttpCode.BAD_REQUEST, msg || 'Request error')
  }
}