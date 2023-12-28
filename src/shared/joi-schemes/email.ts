import Joi from 'joi';

const emailJoi = Joi.string()
  .email({ tlds: { allow: false } })
  .allow('')
  .optional()
  .messages({
    // Использование такого формата предписано документациоей Joi
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'string.email': 'Email должен иметь вид example@example.com',
  });

export default emailJoi;
