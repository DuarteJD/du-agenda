import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const routes = Router();

routes.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

routes.post('/', async (request, response) => {
  try {
    const { date, provider_id } = request.body;

    // Tratamento das informações
    const parseDate = parseISO(date);

    // Chamando o arquivo que irá persistir meus dados
    const appointmentServiceCreate = new CreateAppointmentService();

    const appointment = await appointmentServiceCreate.execute({
      date: parseDate,
      provider_id,
    });

    // Retornando o resultado para o usuário
    return response.json(appointment);
  } catch (error) {
    // Tratamento de erros
    return response.status(400).json({ error: error.message });
  }
});

export default routes;
