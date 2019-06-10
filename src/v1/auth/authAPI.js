import { Router } from 'express';
import * as AuthController from './AuthController';

const router = new Router();

router
  .post('/signup', AuthController.signup)
  .post('/login', AuthController.login)
  .get('/logout', AuthController.logout);

export default router;
