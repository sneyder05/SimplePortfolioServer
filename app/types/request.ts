import { GenericObject, } from './generic'

export interface IEndpoint {
  uri: string,
  method: RequestMethod,
  headers?: GenericObject,
  data?: string | GenericObject
}

export enum RequestMethod {
  Post = 'POST',
  Get = 'GET'
}