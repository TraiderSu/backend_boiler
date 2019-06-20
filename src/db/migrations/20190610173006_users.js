exports.up = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id BIGSERIAL,
        email VARCHAR(256) NOT NULL UNIQUE,
        username VARCHAR(256) NOT NULL UNIQUE,
        password CHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id)
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users;
  `);
};
