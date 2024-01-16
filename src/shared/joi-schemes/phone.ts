/* eslint-disable @typescript-eslint/naming-convention */
// Использование такого формата предписано документациоей Joi

import Joi from 'joi';

const phoneJoi = Joi.string()
  .required()
  .regex(/^[+]7 \(\d{3}\) \d{3} \d{2} \d{2}$/)
  .messages({
    'string.pattern.base': 'Номер телефона должен иметь вид +7 (000) 000 00 00',
    'string.empty': 'Заполните это поле',
  });

export default phoneJoi;
