import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, provider_id } = request.body;

    // Tratamento das informações
    const parseDate = parseISO(date);

    // Chamando o arquivo que irá persistir meus dados
    const appointmentServiceCreate = new CreateAppointmentService(
      container.resolve('AppointmentsRepository'),
    );

    const appointment = await appointmentServiceCreate.execute({
      date: parseDate,
      provider_id,
    });

    // Retornando o resultado para o usuário
    return response.json(appointment);
  }
}