import Joi from 'joi';
import nameRequiredJoi from '../../shared/joi-schemes/name-required';
import phoneJoi from '../../shared/joi-schemes/phone';
import addressJoi from '../../shared/joi-schemes/address';

const registerSchema = Joi.object({
  name: nameRequiredJoi,
  phone: phoneJoi,
  address: addressJoi,
});

export default registerSchema;
