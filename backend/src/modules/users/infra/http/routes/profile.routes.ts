import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const routes = Router();
const profileController = new ProfileController();

routes.put('/', profileController.update);
routes.get('/', profileController.index);

export default routes;
