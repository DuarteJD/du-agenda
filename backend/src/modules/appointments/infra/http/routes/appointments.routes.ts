import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const routes = Router();
const appointmentsController = new AppointmentsController();

// routes.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

routes.post('/', appointmentsController.create);

export default routes;
