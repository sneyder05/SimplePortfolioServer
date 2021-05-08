import Joi from 'joi'
import { Segments, } from '../../../libs/lambda-joisify/types'

export default Joi.object({
  [Segments.PathParams]: {
    id: Joi.string().alphanum().required(),
  },
}).unknown()