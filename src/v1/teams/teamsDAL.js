import { getSchema, startTransaction } from '../../db';
import { AppError } from '../../services/errorService';

export const getRecordList = async ({ limit, offset, q, order_by = [], ...rest }) => {
  const baseQuery = () => getSchema('teams').where(rest);

  const total = await baseQuery()
    .count()
    .first();

  const result = await baseQuery()
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
  const [record] = await getSchema('teams')
    .select()
    .where({ id });

  return record;
};

export const createRecord = async params => {
  const [created] = await getSchema('teams')
    .insert(params)
    .returning('*');

  return created;
};

export const updateRecord = async (id, params) => {
  const [updated] = await getSchema('teams')
    .update({ ...params, updated_at: new Date() })
    .where({ id })
    .returning('*');

  return updated;
};

export const deleteRecord = async id => {
  const [deleted] = await getSchema('teams')
    .where({ id })
    .del()
    .returning('*');

  return deleted;
};

export const getTeamUserList = async (team_id, { limit, offset, q, order_by = [], ...rest }) => {
  const baseQuery = () =>
    getSchema('users_teams')
      .innerJoin('users', 'users_teams.user_id', 'users.id')
      .where({ team_id, ...rest });

  const total = await baseQuery()
    .count()
    .first();

  const result = await baseQuery()
    .modify(queryBuilder => order_by.forEach(item => queryBuilder.orderBy(item[0], item[1])))
    .limit(limit)
    .offset(offset)
    .select(['users.id', 'users.username', 'users.email', 'users.created_at', 'users.updated_at']);

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

export const updateTeamUserList = async (team_id, { user_ids }) => {
  const trx = await startTransaction();
  const operations = [];

  user_ids.forEach(user_id => {
    operations.push(trx('users_teams').insert({ team_id, user_id }));
  });

  return Promise.all(operations)
    .then(async () => {
      await trx.commit();

      const result = await getSchema('users_teams')
        .innerJoin('users', 'users_teams.user_id', 'users.id')
        .whereIn('user_id', user_ids)
        .andWhere({ team_id })
        .select(['users.id', 'users.username', 'users.email', 'users.created_at', 'users.updated_at']);

      return {
        result,
        success: true
      };
    })
    .catch(err => {
      console.log('err', err);
      throw new AppError();
    });
};
