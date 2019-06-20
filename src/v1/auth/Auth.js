import Joi from 'joi';
import { ValidationError } from '../../services/errorService';

const AuthSignup = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .required(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .options({ language: { any: { allowOnly: 'must match password' } } })
      .required()
  },
  params: {},
  query: {}
};

const AuthLogin = {
  body: {
    username: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .required()
  },
  params: {},
  query: {}
};

export const validate = async ({ query, body, params, url }) => {
  const validationSchema = url => (url === '/login' ? AuthLogin : AuthSignup);

  let result = await Joi.validate({ query, body, params }, validationSchema(url), {
    abortEarly: false,
    stripUnknown: true
  }).catch(err => {
    throw new ValidationError(err);
  });

  return result;
};
