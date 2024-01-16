import Joi from 'joi';

const messageJoi = Joi.string().max(300).required();

export default messageJoi;
