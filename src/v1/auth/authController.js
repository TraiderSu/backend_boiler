import config from 'config';
import * as authService from './authService';
import * as UsersDAL from '../users/UsersDAL';

const cookieOptions = {
  httpOnly: true,
  secure: config.get('node_env') === 'production',
  signed: true
};

export const signup = async (req, res, next) => {
  try {
    const newUser = await UsersDAL.createRecord(req.body);
    const token = await authService.issueToken(newUser.id);
    res.cookie('next_token', newUser, cookieOptions);
    res.status(200).json({ user: newUser, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UsersDAL.getRecord({ email: req.body.email });
    if (!user || !authService.checkPassword(req.body.password, user.password)) {
      throw new InvalidError('Invalid email or password');
    }

    const token = await authService.issueToken(user.id);
    const { password: _, ...rest } = user;
    res.cookie('next_token', { ...rest }, cookieOptions);
    res.status(200).json({ token, user: { ...rest } });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('next_token', cookieOptions);
    res.status(200).json({ message: 'logged out' });
  } catch (err) {
    next(err);
  }
};

export const checkAuth = async (req, _, next) => {
  if (req.signedCookies && req.signedCookies.next_token) {
    next();
  } else {
    next(new UnauthorizedError('Needs to login'));
  }
};
