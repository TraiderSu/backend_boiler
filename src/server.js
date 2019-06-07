import express from 'express';
import config from 'config';
import swaggerService from './services/swaggerService';
import { errorService } from './services/errorService';
import postsAPI from './v1/posts/postsAPI';

const dev = config.get('node_env') !== 'production';
const server = express();

const middleware = [express.json(), express.urlencoded({ extended: false })];

server.use(middleware); // Middleware
server.use('/ping', (_, res) => res.status(200).json({ ok: 'Pong' }));

if (dev) {
  swaggerService(server);
}

server.use('/v1', [postsAPI]); // Routes

server.get('*', () => {
  throw new Error('Page not found');
});

server.use(errorService);

export default server;
