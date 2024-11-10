import Joi from 'joi';
import { TPassword } from './reset-password';

export const resetPasswordSchema = Joi.object<TPassword>({
  newPassword: Joi.string().required().min(6).max(40).messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен быть не менее 6 символов',
    'string.max': 'Пароль должен быть не более 40 символов',
  }),
  repeatPassword: Joi.string()
    .required()
    .equal(Joi.ref('newPassword'))
    .messages({
      'string.empty': 'Повторите пароль обязателен',
      'any.only': 'Пароли не совпадают',
    }),
});
