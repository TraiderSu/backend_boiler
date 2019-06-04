import { getSchema } from '../../db';

export const getRecordList = async (params = {}) => {
  const result = await getSchema('posts')
    .select()
    .where(params);

  return result;
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
    .update(params)
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
