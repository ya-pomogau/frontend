import Joi from 'joi';

const nameOptionalJoi = Joi.string().allow('').optional();

export default nameOptionalJoi;
