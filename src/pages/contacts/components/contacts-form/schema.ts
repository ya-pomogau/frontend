import Joi from 'joi';
import { TContacts } from 'shared/types/common.types';

export const schema = Joi.object<TContacts>({
  email: Joi.string()
    .required()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
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
});
