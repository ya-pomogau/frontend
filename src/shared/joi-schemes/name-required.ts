/* eslint-disable @typescript-eslint/naming-convention */
// Использование такого формата предписано документациоей Joi

import Joi from 'joi';

const pattern = /^[а-яА-Яa-zA-ZЁё\-\s]*$/;

const nameRequiredJoi = Joi.string().required().pattern(pattern).messages({
  'string.empty': 'Заполните это поле',
  'string.pattern.base':
    'Имя должно содержать только кириллицу, латиницу, пробел и дефис',
});

export default nameRequiredJoi;
