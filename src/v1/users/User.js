import Joi from 'joi';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import { JoiValidationError } from '../../services/errorService';

const orderByRegex = /^\d-(id|username|email)-(asc|desc)$/i;

const Post = {
  body: {
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
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
    order_by: Joi.alternatives()
      .try(
        Joi.string().regex(orderByRegex),
        Joi.array()
          .items(Joi.string().regex(orderByRegex))
          .error(() => ({ message: 'format error' }))
      )
      .default('1-id-asc'),
    q: Joi.string(),
    username: Joi.string(),
    email: Joi.string()
  }
};

export const validate = async ({ query, body, params, method }) => {
  let result = await Joi.validate({ query, body, params }, Post, {
    context: { isPostMethod: method === 'POST' },
    abortEarly: false,
    stripUnknown: true,
    language: { string: { regex: { base: 'valid format is 1-id-asc' } } }
  }).catch(err => {
    throw new JoiValidationError(err);
  });

  if (result.query.hasOwnProperty('order_by')) {
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
