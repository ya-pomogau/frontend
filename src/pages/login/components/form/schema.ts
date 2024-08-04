import Joi from 'joi';
import { ILoginForm } from './index';

export const schema = Joi.object<ILoginForm>({
  login: Joi.string().min(4).required().messages({
    'string.empty': 'Логин не может быть пустым',
    'string.min': 'Минимальная длина логина 4 символа',
    'any.required': 'Логин обязателен',
  }),

  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Пароль не может быть пустым',
      'string.pattern.base':
        'Пароль может содержать только латинские буквы и цифры',
      'string.min': 'Минимальная длина пароля 6 символов',
      'any.required': 'Пароль обязателен',
    }),
});
