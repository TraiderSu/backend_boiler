import Knex from 'knex';
import path from 'path';
import config from 'config';

const connection = Knex(config.get('db'));

const getMigrations = () => {
  const migrationConfig = {
    ...config.get('db'),
    migrations: {
      directory: path.normalize(`${__dirname}/migrations`),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.normalize(`${__dirname}/seeds`)
    }
  };
  return Knex(migrationConfig);
};

export const getSchema = schema => connection(schema);
export const startTransaction = () =>
  new Promise((resolve, reject) => connection.transaction(trx => resolve(trx)).catch(reject));

export const migrate = async () => {
  const migrationKnex = getMigrations();
  await migrationKnex.migrate.latest();
  await migrationKnex.destroy();
};
