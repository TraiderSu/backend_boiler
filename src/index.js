import config from 'config';
import server from './server';
import * as PostgresDB from './db';

const port = config.get('server_port');

Promise.resolve()
  .then(async () => {
    console.log('Migrating DB ...');
    await PostgresDB.migrate();
    console.log('Migration Done.');
  })
  .then(() => {
    server.listen(port, err => {
      if (err) throw err;
      console.log(`🚀 Server listening on ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
