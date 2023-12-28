/* eslint-disable @typescript-eslint/naming-convention */
// Использование такого формата предписано документациоей Joi

import Joi from 'joi';

const nameRequiredJoi = Joi.string().required().messages({
  'string.empty': 'Заполните это поле',
});

export default nameRequiredJoi;
