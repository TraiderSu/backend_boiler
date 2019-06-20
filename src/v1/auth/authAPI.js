import { Router } from 'express';
import { checkAuth } from '../auth/authController';
import * as AuthController from './AuthController';

const router = new Router();

router
  .post('/signup', AuthController.signup)
  .post('/login', AuthController.login)
  .get('/logout', checkAuth, AuthController.logout);

export default router;
