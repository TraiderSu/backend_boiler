import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';

export const checkPassword = (inputPassword, dbPassword) => bcrypt.compare(inputPassword, dbPassword);

export const issueToken = ({ id }) =>
  jwt.sign({ id }, config.get('jwt.secret'), {
    expiresIn: config.get('jwt.expires_in')
  });

export const verifyToken = token => jwt.verify(token, config.get('jwt.secret'));
