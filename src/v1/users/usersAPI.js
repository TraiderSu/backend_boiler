import { Router } from 'express';
import * as UsersController from './UsersController';
import { checkAuth } from '../auth/authController';

const router = new Router();

router.get('/users', UsersController.getList).get('/users/:id', checkAuth, UsersController.getItem);

export default router;
