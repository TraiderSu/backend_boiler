import { getSchema } from '../../db';

export const getRecordList = async ({ limit, offset, q, ...rest }) => {
  const total = await getSchema('posts')
    .count()
    .where(rest)
    .first();

  const result = await getSchema('posts')
    .limit(limit)
    .offset(offset)
    .where(rest)
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
  const [record] = await getSchema('posts')
    .select()
    .where({ id });

  return record;
};

export const createRecord = async params => {
  const [created] = await getSchema('posts')
    .insert(params)
    .returning('*');

  return created;
};

export const updateRecord = async (id, params) => {
  const [updated] = await getSchema('posts')
    .update({ ...params, updated_at: new Date() })
    .where({ id })
    .returning('*');

  return updated;
};

export const deleteRecord = async id => {
  const [deleted] = await getSchema('posts')
    .where({ id })
    .del()
    .returning('*');

  return deleted;
};
