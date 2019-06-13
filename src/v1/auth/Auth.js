import Joi from 'joi';
import { ValidationError } from '../../services/errorService';

const requiredOptionalToggler = {
  is: Joi.boolean()
    .valid(true)
    .required(),
  then: Joi.required(),
  otherwise: Joi.optional()
};

const Auth = {
  body: {
    username: Joi.string().when('$isSignup', requiredOptionalToggler),
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .required(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('$isSignup', requiredOptionalToggler)
      .options({ language: { any: { allowOnly: 'must match password' } } })
  },
  params: {
    id: Joi.number()
      .integer()
      .min(0)
  },
  query: {}
};

export const validate = async ({ query, body, params, url }) => {
  let result = await Joi.validate({ query, body, params }, Auth, {
    context: { $isSignup: url === '/login' },
    abortEarly: false,
    stripUnknown: true
  }).catch(err => {
    throw new ValidationError(err);
  });

  return result;
};
