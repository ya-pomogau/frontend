import Joi from 'joi';

const addressJoi = Joi.string().required().min(1);

export default addressJoi;
