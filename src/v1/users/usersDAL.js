import { getSchema } from '../../db';

export const getRecordList = async ({ limit, offset, q, order_by = [], ...rest }) => {
  const total = await getSchema('users')
    .count()
    .where(rest)
    .first();

  const result = await getSchema('users')
    .where(rest)
    .modify(queryBuilder => order_by.forEach(item => queryBuilder.orderBy(item[0], item[1])))
    .limit(limit)
    .offset(offset)
    .select();

  return {
    result,
    pagination: {
      limit,
      offset,
      total: Number(total.count)
    },
    success: true
  };
};

export const getRecord = async id => {
  const [record] = await getSchema('users')
    .select()
    .where({ id });

  return record;
};

export const createRecord = async params => {
  const [created] = await getSchema('users')
    .insert(params)
    .returning('*');

  return created;
};

export const updateRecord = async (id, params) => {
  const [updated] = await getSchema('users')
    .update({ ...params, updated_at: new Date() })
    .where({ id })
    .returning('*');

  return updated;
};

export const deleteRecord = async id => {
  const [deleted] = await getSchema('users')
    .where({ id })
    .del()
    .returning('*');

  return deleted;
};
