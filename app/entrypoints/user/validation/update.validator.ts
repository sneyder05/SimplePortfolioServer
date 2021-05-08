import Joi from 'joi'
import { Segments, } from '../../../libs/lambda-joisify/types'
import { ImageBase64, } from '../../../libs/lambda-joisify/validators'

export default Joi.object({
  [Segments.PathParams]: {
    id: Joi.string().alphanum().required(),
  },
  [Segments.Body]: {
    fullname: Joi.string().required(),
    description: Joi.string().required(),
    twitterUserName: Joi.string().required(),
    image: ImageBase64().required(),
  },
}).unknown()