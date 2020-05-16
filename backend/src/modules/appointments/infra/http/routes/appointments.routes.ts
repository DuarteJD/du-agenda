import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const routes = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// routes.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

routes.post('/', appointmentsController.create);
routes.get('/me', providerAppointmentsController.index);

export default routes;
