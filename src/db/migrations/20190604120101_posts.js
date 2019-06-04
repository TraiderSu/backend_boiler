exports.up = async knex => {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    DROP TABLE IF EXISTS posts;
    CREATE TABLE posts (
        id uuid DEFAULT gen_random_uuid (),
        title VARCHAR(256) NOT NULL UNIQUE,
        description VARCHAR(20000) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id)
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP EXTENSION pgcrypto;
    DROP TABLE IF EXISTS posts;
  `);
};
