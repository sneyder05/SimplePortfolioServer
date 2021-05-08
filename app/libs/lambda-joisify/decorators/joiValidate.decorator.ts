/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */

import Joi from 'joi'
import { APIGatewayEvent, } from 'aws-lambda'
import { JoiError, } from '../../../error'
import { MessageUtil, } from '../../../utils'
import { IAppError, } from '../../../types'

export interface IJoiValidateProperties {
  schema: Joi.Schema,
}

const JoiValidate = (props: IJoiValidateProperties | Joi.Schema): ( (target: Object, propertyKey: string, propertyDesciptor: PropertyDescriptor) => PropertyDescriptor ) => {
  const opts = Joi.isSchema(props) ? { schema: props as Joi.Schema, } : props as IJoiValidateProperties

  return (_target: Object, _propertyKey: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
    const method = propertyDesciptor.value

    propertyDesciptor.value = async function(...args: any[]) {
      try {
        const payload: APIGatewayEvent = args && args.length ? args[0] : null
        const parsedPayload = { ...payload, }

        if (payload) {
          if (parsedPayload.body) {
            parsedPayload.body = JSON.parse(payload.body)
          }

          const joiValidationResult = opts.schema.validate(parsedPayload)

          if (joiValidationResult.error) {
            const errors = joiValidationResult.error.details.map(err => err.message).join()

            throw new JoiError(errors)
          }
        }

        const result = await method.apply(this, args)

        return result
      } catch (err) {
        return MessageUtil.from(err as IAppError)
      }
    }

    return propertyDesciptor
  }
}

export default JoiValidate