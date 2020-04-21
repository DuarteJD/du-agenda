import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => {
  return response.json({ message: 'post na rota appointment!' });
});

export default routes;
