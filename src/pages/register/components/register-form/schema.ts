import Joi from 'joi';
import { IRegisterForm } from './index';
import { userRole } from 'shared/types/common.types';

export const schema = Joi.object<IRegisterForm>({
  role: Joi.required(),
  name: Joi.string().min(4).max(40).required().messages({
    'string.empty': 'Имя не должно быть пустым',
    'string.min': 'Имя должно быть больше 4 символов',
    'string.max': 'Имя должно быть меньше 40 символов',
    'any.required': 'Имя обязателено',
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base':
        'Введите номер телефона в формате +7 (000) 000-00-00',
      'string.empty': 'Телефон не может быть пустым',
      'any.required': 'Телефон обязателен',
    }),
  address: Joi.object()
    .keys({
      address: Joi.string(),
      coords: Joi.any(),
    })
    .when('role', {
      is: userRole.RECIPIENT,
      then: Joi.required().messages({
        'string.empty':
          'Не введен адрес. Пожалуйста, укажите адрес, по которому требуется помощь!',
      }),
    })
    .when('role', {
      is: userRole.VOLUNTEER,
      then: Joi.required().messages({
        'string.empty':
          'Не введен адрес. Пожалуйста, укажите адрес, где вы находитесь!',
      }),
    }),
});
