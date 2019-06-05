import Joi from 'joi';
import _isEmpty from 'lodash/isEmpty';

const Post = {
  method: Joi.string().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
  body: {
    id: Joi.number().integer(),
    title: Joi.string(),
    description: Joi.string(),
    created_at: Joi.date().timestamp(),
    updated_at: Joi.date().timestamp()
  },
  params: {
    id: Joi.number().integer()
  },
  query: {
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    q: Joi.string()
  }
};

export const validate = async ({ query, body, params, method }) => {
  const result = await Joi.validate({ query, body, params, method }, Post, { abortEarly: false }).catch(err => {
    console.log('Ошибка в промисе Joi');
    throw err;
  });

  return result;
};
