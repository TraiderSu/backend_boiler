import { Router } from 'express';
import * as TeamsController from './teamsController';

const router = new Router();

router
  .get('/teams', TeamsController.getList)
  .post('/teams', TeamsController.createItem)
  .get('/teams/:id', TeamsController.getItem)
  .patch('/teams/:id', TeamsController.updateItem)
  .delete('/teams/:id', TeamsController.deleteItem)
  .get('/teams/:id/users', TeamsController.getTeamUserList)
  .put('/teams/:id/users', TeamsController.updateTeamUserList);

export default router;
