exports.up = async knex => {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id bigserial,
        email VARCHAR(256) NOT NULL,
        username VARCHAR(256) NOT NULL,
        password CHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id)
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP EXTENSION pgcrypto;
    DROP TABLE IF EXISTS users;
  `);
};
