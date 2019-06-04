import express from 'express';
import errorService from './services/errorsService';
import postsAPI from './v1/posts/postsAPI';

const server = express();

const middleware = [express.json(), express.urlencoded({ extended: false })];

const routes = [postsAPI];

server.use(middleware);
server.use('/ping', (_, res) => res.status(200).json({ ok: 'Pong' }));
server.use('/v1', routes);

server.get('*', () => {
  throw new Error('Page not found');
});

server.use(errorService);

export default server;
