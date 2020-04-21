import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import authentication from '../middlewares/authentication';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use(authentication);
routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);

export default routes;
