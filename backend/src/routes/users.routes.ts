import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
});

export default routes;
