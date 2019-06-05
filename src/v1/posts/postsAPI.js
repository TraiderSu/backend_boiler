import { Router } from 'express';
import * as PostsController from './PostsController';

const router = new Router();

router
  .get('/posts', PostsController.getList)
  .post('/posts', PostsController.createItem)
  .get('/posts/:id', PostsController.getItem)
  .patch('/posts/:id', PostsController.updateItem)
  .delete('/posts/:id', PostsController.deleteItem);

export default router;
