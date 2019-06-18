exports.up = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users_teams;
    CREATE TABLE users_teams (
        id BIGSERIAL,
        user_id BIGSERIAL, 
        team_id BIGSERIAL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
        UNIQUE (user_id, team_id)
        
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users_teams;
  `);
};
