import { APIGatewayEvent, Handler, } from 'aws-lambda'
import { GetUserByIdEntrypoint, GetUserTwitterTimelineEntrypoint, UpdateUserEntrypoint, } from '../entrypoints/user'
import { IEventResponse, } from '../types'

/**
 * Gets an user
 * @author fnavia
 * @since 1.0.0
 * @param event Lambda request payload
 * @returns A formatted request response
 */
export const get: Handler = async (event: APIGatewayEvent): Promise<IEventResponse> => {
  return GetUserByIdEntrypoint.get(event)
}

/**
 * Updates an user
 * @author fnavia
 * @since 1.0.0
 * @param event Lambda request payload
 * @returns A formatted request response
 */
export const update: Handler = async (event: APIGatewayEvent): Promise<IEventResponse> => {
  return UpdateUserEntrypoint.update(event)
}

/**
 * Gets the twitter user timeline
 * @author fnavia
 * @since 1.0.0
 * @param event Lambda request payload
 * @returns A formatted request response
 */
export const getTwitterTimeline: Handler = async (event: APIGatewayEvent): Promise<IEventResponse> => {
  return GetUserTwitterTimelineEntrypoint.get(event)
}