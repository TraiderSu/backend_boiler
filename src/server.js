import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import swaggerService from './services/swaggerService';
import { errorService, NotFoundError } from './services/errorService';
import authAPI from './v1/auth/authAPI';
import postsAPI from './v1/posts/postsAPI';
import usersAPI from './v1/users/usersAPI';
import teamsAPI from './v1/teams/teamsAPI';

const dev = config.get('node_env') !== 'production';
const server = express();

const middleware = [express.json(), express.urlencoded({ extended: false }), cookieParser(config.get('jwt.secret'))];

server.use(middleware); // Middleware
server.use('/ping', (_, res) => res.status(200).json({ ok: 'Pong' }));

if (dev) {
  swaggerService(server);
}

server.use('/v1', [authAPI, postsAPI, teamsAPI, usersAPI]); // Routes

server.get('*', () => {
  throw new NotFoundError();
});

server.use(errorService);

export default server;
