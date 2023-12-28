import Joi from 'joi';
import loginJoi from '../../shared/joi-schemes/login';
import passwordJoi from '../../shared/joi-schemes/password';

const loginSchema = Joi.object({
  login: loginJoi,
  password: passwordJoi,
});

export default loginSchema;
