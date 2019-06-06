import Joi from 'joi';

const requiredOptionalToggler = {
  is: Joi.boolean()
    .valid(true)
    .required(),
  then: Joi.required(),
  otherwise: Joi.optional()
};

const Post = {
  body: {
    title: Joi.string().when('$isPostMethod', requiredOptionalToggler),
    description: Joi.string().when('$isPostMethod', requiredOptionalToggler)
  },
  params: {
    id: Joi.number()
      .integer()
      .min(0)
  },
  query: {
    limit: Joi.number()
      .integer()
      .min(0)
      .default(10),
    offset: Joi.number()
      .integer()
      .min(0)
      .default(0),
    q: Joi.string()
  }
};

export const validate = async ({ query, body, params, method }) => {
  const result = await Joi.validate({ query, body, params }, Post, {
    context: { isPostMethod: method === 'POST' },
    abortEarly: false,
    stripUnknown: true
  }).catch(err => {
    console.log('Ошибка в промисе Joi, нужно обработать');
    throw err;
  });

  return result;
};
