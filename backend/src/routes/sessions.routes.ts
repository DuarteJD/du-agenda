import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new AuthenticateUserService();

    const { user } = await authUser.execute({ email, password });

    delete user.password;
    return response.json(user);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
});

export default routes;
