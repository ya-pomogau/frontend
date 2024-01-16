import Joi from 'joi';
import emailJoi from '../../shared/joi-schemes/email';
import messageJoi from '../../shared/joi-schemes/message';
import nameRequiredJoi from '../../shared/joi-schemes/name-required';

const feedbackSchema = Joi.object({
  firstName: nameRequiredJoi,
  email: emailJoi,
  message: messageJoi,
});

export default feedbackSchema;
