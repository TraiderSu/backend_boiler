exports.up = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users_teams;
    CREATE TABLE users_teams (
        id bigserial,
        user_id bigserial, 
        team_id bigserial,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (team_id) REFERENCES teams(id),
        UNIQUE (user_id, team_id)
        
    );
  `);
};

exports.down = async knex => {
  await knex.raw(`
    DROP TABLE IF EXISTS users_teams;
  `);
};