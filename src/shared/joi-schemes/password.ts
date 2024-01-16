/* eslint-disable @typescript-eslint/naming-convention */
// Использование такого формата предписано документациоей Joi

import Joi from 'joi';

const passwordJoi = Joi.string().required().min(6).messages({
  'string.empty': 'Заполните это поле',
  'string.min': 'Пароль должен содержать не менее 6 символов',
});

export default passwordJoi;
