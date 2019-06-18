exports.up = async knex => {
  await knex.raw(`
    ALTER TABLE posts
    ADD COLUMN user_id BIGINT,
    ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION;
  `);
};

exports.down = async knex => {
  await knex.raw(`
    ALTER TABLE posts
    DROP COLUMN IF EXISTS user_id;
  `);
};
