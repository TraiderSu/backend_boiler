import { Router } from 'express';
import * as UsersController from './UsersController';

const router = new Router();

router
  .get('/users', UsersController.getList)
  .post('/users', UsersController.createItem)
  .get('/users/:id', UsersController.getItem)
  .patch('/users/:id', UsersController.updateItem)
  .delete('/users/:id', UsersController.deleteItem);

export default router;
