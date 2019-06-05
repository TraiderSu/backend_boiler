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

/**
 * @swagger
 *
 * definitions:
 *   Post:
 *     properties:
 *       id:
 *         type: integer
 *         uniqueItems: true
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get posts list
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Post"
 *
 *
 */
