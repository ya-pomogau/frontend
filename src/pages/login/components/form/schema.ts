import Joi from 'joi';
import { ILoginForm } from './index';

export const schema = Joi.object<ILoginForm>({
  login: Joi.string().min(4).required().messages({
    'string.empty': 'Логин не может быть пустым',
    'string.min': 'Минимальная длина логина 4 символа',
    'any.required': 'Логин обязателен',
  }),

  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Минимальная длина пароля 6 символов',
    'any.required': 'Пароль обязателен',
  }),
});
