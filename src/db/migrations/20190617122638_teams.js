exports.up = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS teams;
    CREATE TABLE teams (
        id bigserial,
        title VARCHAR(256) NOT NULL,
        description VARCHAR(256) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id)
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS teams;
  `);
};
