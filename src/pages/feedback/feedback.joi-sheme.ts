import Joi from 'joi';
import nameOptionalJoi from '../../shared/joi-schemes/name-optional';
import emailJoi from '../../shared/joi-schemes/email';
import messageJoi from '../../shared/joi-schemes/message';

const feedbackSchema = Joi.object({
  firstName: nameOptionalJoi,
  email: emailJoi,
  message: messageJoi,
});

export default feedbackSchema;
