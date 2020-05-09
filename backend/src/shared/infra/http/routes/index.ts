import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import authentication from '@modules/users/infra/http/middlewares/authentication';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);
routes.use(authentication);
routes.use('/appointments', appointmentRouter);

export default routes;
