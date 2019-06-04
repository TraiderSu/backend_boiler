import { Router } from 'express';
import * as PostsController from './PostsController';

const router = new Router();

router
  .get('/posts', PostsController.getList)
  .post('/posts', PostsController.createItem)
  .get('/posts/:id', PostsController.getItem)
  .put('/posts/:id', PostsController.updateItem)
  .patch('/posts/:id', PostsController.patchItem)
  .delete('/posts/:id', PostsController.deleteItem);

export default router;
