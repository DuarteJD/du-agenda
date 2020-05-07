import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const routes = Router();
const sessionController = new SessionsController();

routes.post('/', sessionController.create);

export default routes;
