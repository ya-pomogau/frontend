import Joi from 'joi';
import { ContactsForm } from './index';

export const schema = Joi.object<ContactsForm>({
  email: Joi.string()
    .required()
    .pattern(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .messages({
      'string.pattern.base': 'Неверный формат электронной почты',
      'string.empty': 'Укажите адрес электронной почты',
    }),
  socialNetwork: Joi.string()
    .required()
    .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)
    .messages({
      'string.pattern.base': 'Неверный формат ссылки',
      'string.empty': 'Укажите ссылку на соцсети',
    }),
  editableInputs: Joi.object(),
});
