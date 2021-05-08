import Joi, { StringSchema, } from 'joi'

export default (): StringSchema => Joi.string().custom((value: string, helpers) => {
  if (value) {
    const [ , base64Content, ] = value.split(';')
    const [ , base64Image, ] = base64Content.split(',')

    const checkBase64 = Joi.object({ base64: Joi.string().base64(), }).validate({ base64: base64Image, })

    if (checkBase64.error) {
      throw new Error('Invalid Base64 image content')
    }

    return value
  }

  return helpers.error('any.invalid')
}, 'Invalid Base64 codification')