import { Router } from 'express';
import { checkAuth } from '../auth/authController';
import * as PostsController from './PostsController';

const router = new Router();

router
  .get('/posts', PostsController.getList)
  .post('/posts', checkAuth, PostsController.createItem)
  .get('/posts/:id', PostsController.getItem)
  .patch('/posts/:id', checkAuth, PostsController.updateItem)
  .delete('/posts/:id', checkAuth, PostsController.deleteItem);

export default router;
