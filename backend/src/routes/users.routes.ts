import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => {
  return response.json({ message: 'POST na rota users' });
});

export default routes;
