import Joi from 'joi';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import { ValidationError } from '../../services/errorService';

const orderByRegex = /^\d-(id|title|description)-(asc|desc)$/i;
const usersOrderByRegex = /^\d-(id|username|email)-(asc|desc)$/i;

export const Team = {
  get: {
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
      order_by: Joi.alternatives()
        .try(
          Joi.string().regex(orderByRegex),
          Joi.array()
            .items(Joi.string().regex(orderByRegex))
            .error(() => ({ message: 'format error' }))
        )
        .default('1-id-asc'),
      q: Joi.string(),
      title: Joi.string(),
      description: Joi.string()
    }
  },
  create: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required()
    }
  },
  update: {
    body: {
      title: Joi.string(),
      description: Joi.string()
    }
  },
  getUserList: {
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
      order_by: Joi.alternatives()
        .try(
          Joi.string().regex(usersOrderByRegex),
          Joi.array()
            .items(Joi.string().regex(usersOrderByRegex))
            .error(() => ({ message: 'format error' }))
        )
        .default('1-id-asc'),
      q: Joi.string(),
      user_id: Joi.number()
        .integer()
        .min(0)
    }
  },
  updateUserList: {
    body: {
      user_ids: Joi.array()
        .items(
          Joi.number()
            .integer()
            .min(0)
        )
        .unique()
        .required()
    },
    params: {
      id: Joi.number()
        .integer()
        .min(0)
    }
  }
};

export const validate = async ({ query, body, params, method }, schema) => {
  let result = await Joi.validate({ query, body, params }, schema, {
    context: { isPostMethod: method === 'POST' },
    abortEarly: false,
    stripUnknown: true,
    language: { string: { regex: { base: 'valid format is 1-id-asc' } } }
  }).catch(err => {
    throw new ValidationError(err);
  });

  if (result.query && result.query.hasOwnProperty('order_by')) {
    let parsedOrderBy;
    const rawOrderBy = _get(result, 'query.order_by');

    const parseValue = item => {
      const arr = item.split('-');
      return [arr[1], arr[2].toUpperCase()];
    };

    if (_isArray(rawOrderBy)) {
      parsedOrderBy = rawOrderBy
        .sort((a, b) => {
          const nameA = a.toLowerCase(),
            nameB = b.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        .map(item => parseValue(item));
    } else {
      parsedOrderBy = [parseValue(rawOrderBy)];
    }

    result = { ...result, query: { ...result.query, order_by: parsedOrderBy } };
  }

  return result;
};
