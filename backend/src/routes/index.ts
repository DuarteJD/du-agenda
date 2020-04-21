import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import authentication from '../middlewares/authentication';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);
routes.use(authentication);
routes.use('/appointments', appointmentRouter);

export default routes;
