import Joi from 'joi';
import { INewAdminForm } from './index';

export const schema = Joi.object<INewAdminForm>({
  fullName: Joi.string().required().min(4).max(40).messages({
    'string.empty': 'Имя не может быть пустым',
    'string.min': 'Имя должно быть больше 4 символов',
    'string.max': 'Имя должно быть меньше 40 символов',
  }),
  email: Joi.string()
    .required()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .messages({
      'string.pattern.base': 'Неверный формат электронной почты',
      'string.empty': 'Укажите адрес электронной почты',
    }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/))
    .messages({
      'string.pattern.base':
        'Введите номер телефона в формате +7 (000) 000-00-00',
      'string.empty': 'Телефон обязателен',
    }),
  address: Joi.object()
    .keys({
      address: Joi.string().required(),
      coords: Joi.any(),
    })
    .messages({
      'string.empty': 'Адрес обязателен',
    }),
  password: Joi.string().required().min(6).max(40).messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен быть не менее 6 символов',
    'string.max': 'Пароль должен быть не более 40 символов',
  }),
  repeatedPassword: Joi.string()
    .required()
    .equal(Joi.ref('password'))
    .messages({
      'string.empty': 'Повторите пароль',
      'any.only': 'Пароли не совпадают',
    }),
});
