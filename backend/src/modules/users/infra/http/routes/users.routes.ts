import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import authentication from '../middlewares/authentication';

const routes = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post('/', usersController.create);

routes.patch(
  '/avatar',
  authentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
